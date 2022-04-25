# Extended version of Unidecode for NodeJS

[![NPM Stats](https://nodei.co/npm/unidecode-plus.png)](https://npmjs.org/package/unidecode-plus/)

[![Build Status](https://travis-ci.com/kshetline/unidecode-plus.svg?branch=master)](https://travis-ci.com/kshetline/unidecode-plus)
[![npm](https://img.shields.io/npm/v/unidecode-plus.svg)](https://npmjs.org/package/unidecode-plus/)
[![npm downloads](https://img.shields.io/npm/dm/unidecode-plus.svg)](https://npmjs.org/package/unidecode-plus/)
[![npm bundle size](https://img.shields.io/bundlephobia/min/unidecode-plus.svg)](https://npmjs.org/package/unidecode-plus/)

__Unidecode-plus__ is an extended version of __unidecode__, which in turn is a  __JavaScript port__ of the __perl module [Text::Unicode](http://search.cpan.org/~sburke/Text-Unidecode-0.04/lib/Text/Unidecode.pm)__.

__Unidecode-plus__ takes full-range Unicode text and tries to represent it using only US-ASCII characters (i.e., the universally
displayable characters between 0x00 and 0x7F). The representation is generally an attempt at transliteration &mdash;
i.e., conveying, in Roman letters, the pronunciation expressed by the original text in some other writing system. Some transliterations go for matching the _shape_ of characters rather than their pronunciation. Various emoji are represented either as "ASCII art" or English text.

__Unidecode-plus__ updates the original __unidecode__ in the following ways:
* Adds support beyond the Unicode Basic Multilingual Plane for transforming many emoji into ASCII-art equivalents.
* Adds a "smart spacing" mode that improves the rendering of text such as "10½", so it comes out as "10 1/2" instead of "101/2"".
* Adds a German mode to convert characters like "ö" into "oe" instead of "o".
* Allows you to skip ranges of characters so that some non-ASCII characters remain untouched, while only other characters are transliterated. You can, for example, keep accented characters and Chinese characters while only transliterating emoji.
* Fixes a bug that transliterated `Ý` to `U` instead of `Y`.

See [Text::Unicode](http://search.cpan.org/~sburke/Text-Unidecode-0.04/lib/Text/Unidecode.pm) for the original README file, including methodology and limitations.

Note that all the files named 'x??.js' in `data` are originally derived directly from equivalent Perl files, distributed under the Perl license, not the BSD or MIT licenses. These files have been modified and supplemented for `unidecode-plus`.

## Installation

    $ npm install unidecode-plus

## Sample usage

    $ node
    > var unidecode = require('unidecode-plus');
    > unidecode("aéà)àçé");
    'aea)ace'
    > unidecode("に間違いがないか、再度確認してください。再読み込みしてください。");
    'niJian Wei iganaika, Zai Du Que Ren sitekudasai. Zai Du miIp misitekudasai. '
    > unidecode('Café 北京, 鞋 size 10½')
    'Cafe Bei Jing , Xie  size 101/2'
    > unidecode('Café 北京, 鞋 size 10½', { smartSpacing: true })
    'Cafe Bei Jing, Xie size 10 1/2'
    > unidecode('ÄäÖöÜü, Schrödinger')
    'AaOoUu, Schrodinger'
    > unidecode('ÄäÖöÜü, Schrödinger', { german: true })
    'AEaeOEoeUEue, Schroedinger'
    > unidecode('Café 北京, 😀😁😇😈😱', { smartSpacing: true })
    'Cafe Bei Jing, :-) :-D O:-) >:-) =:-O'
    > unidecode('Café 北京, 😀😁😇😈😱', { skipRanges: [[0x0, 0xFFFF]], smartSpacing: true })
    'Café 北京, :-) :-D O:-) >:-) =:-O'

## API

_Note: Typings are provided by this package for use with TypeScript._

This in the main transliteration function:

```
unidecode(str: string, options?: UnidecodeOptions): string;
```

It has the following options:

```
interface UnidecodeOptions {
  deferredSmartSpacing?: boolean;
  german?: boolean;
  skipRanges?: [number, number][];
  smartSpacing?: boolean;
}
```

* `german`: When set to `true`, these characters with an umlaut (`Ä`, `ä`, `Ö`, `ö`, `Ü`, `ü`) are followed by the letter '`e`' after the umlaut is removed (becoming `AE`, `ae`, `OE`, `oe`, `UE`, `ue`).

* `skipRanges`: This option is array of arrays, where each internal array contains two numbers (a starting codepoint and an ending codepoint), specifying ranges of characters which should NOT be transliterated. This permits behavior like the example above where emoji are transliterated, but accented characters and Chinese characters are not. Multiple ranges can be specified, such as `[[0, 255], [0x370–0x3FF]]`, which will preserve basic Western European text and Greek text.

* `smartSpacing`: When true, this option helps remove some unnecessary spaces added by transliteration, and adds other spaces where they help provide clarity (see example above). The main disadvantages of using `smartSpacing` is that it's slower and the results are prettier but less predictable. A very unlikely (but possible) problem is that `smartSpacing` uses the codepoints `0x80` and `0x81` in its operation. If they are part of your original text data, they will either be removed or turned into spaces.

The option `deferredSmartSpacing` is something you'll be unlikely to need. Its main function is to defer part of the operation of `smartSpacing` until later, leaving `0x80` and `0x81` characters embedded in the resulting text. This way text can be assembled piecemeal (such as when processing buffered output) then resolved later, as a whole or in "safe" chunks ("safe" meaning here chunks which don't start or end on a boundary needing re-spacing).

That resolution is performed using this function:

```
unidecode.resolveSpacing(str: string): string;
```
