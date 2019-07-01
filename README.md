# Extended version of Unidecode for NodeJS

[![NPM Stats](https://nodei.co/npm/unidecode-plus.png)](https://npmjs.org/package/unidecode-plus/)  
[![Build Status](https://travis-ci.com/kshetline/unidecode-plus.svg?branch=master)](https://travis-ci.com/kshetline/unidecode-plus)
[![npm](https://img.shields.io/npm/v/unidecode-plus.svg)](https://npmjs.org/package/unidecode-plus/)
[![npm downloads](https://img.shields.io/npm/dm/unidecode-plus.svg)](https://npmjs.org/package/unidecode-plus/)
[![npm bundle size](https://img.shields.io/bundlephobia/min/unidecode-plus.svg)](https://npmjs.org/package/unidecode-plus/)

__Unidecode-plus__ is an extended version of __unidecode__, which in turn is a  __JavaScript port__ of the __perl module [Text::Unicode](http://search.cpan.org/~sburke/Text-Unidecode-0.04/lib/Text/Unidecode.pm)__.

__Unidecode-plus__ takes full-range Unicode text and tries to represent it using only US-ASCII characters (i.e., the universally
displayable characters between 0x00 and 0x7F). The representation is generally an attempt at transliteration --
i.e., conveying, in Roman letters, the pronunciation expressed by the text in some other writing system. Some of the transliterations go for matching the _shape_ of characters rather than their pronunciation, such as transliterating the Greek letter `ρ` (rho) as the ASCII `p`, even though it sounds more like an `r`. Various emojis are represented either as "ASCII art" or English text.

See [Text::Unicode](http://search.cpan.org/~sburke/Text-Unidecode-0.04/lib/Text/Unidecode.pm) for the original README file, including methodology and limitations.

Note that all the files named 'x??.js' in `data` are originally derived directly from equivalent perl files, distributed under the perl license, not the BSD license. These files have been modified and supplemented for `unidecode-plus`.

## Installation

    $ npm install unidecode-plus

## Usage

    $ node
    > var unidecode = require('unidecode-plus');
    > unidecode("aéà)àçé");
    'aea)ace'
    > unidecode("に間違いがないか、再度確認してください。再読み込みしてください。");
    'niJian Wei iganaika, Zai Du Que Ren sitekudasai. Zai Du miIp misitekudasai. '
