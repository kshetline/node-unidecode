# Extended version of Unidecode for NodeJS

-----------------

__Unidecode-plus__ is an extended version of __unidecode__, which in turn is a  __JavaScript port__ of the __perl module [Text::Unicode](http://search.cpan.org/~sburke/Text-Unidecode-0.04/lib/Text/Unidecode.pm)__.

__Unidecode-plus__ takes full-range Unicode text and tries to represent it using only US-ASCII characters (i.e., the universally
displayable characters between 0x00 and 0x7F). The representation is almost always an attempt at transliteration --
i.e., conveying, in Roman letters, the pronunciation expressed by the text in some other writing system. Some of the transliterations go for matching the _shape_ of characters rather than their pronunciation, such as transliterating the Greek letter `ρ` (rho) as the ASCII `p`, even though it sounds more like an `r`.

See [Text::Unicode](http://search.cpan.org/~sburke/Text-Unidecode-0.04/lib/Text/Unidecode.pm) for the original README file, including methodology and limitations.

Note that all the files named 'x??.js' in data are derived directly from the equivalent perl file, and both sets of files are distributed under the perl license not the BSD license.

## Installation

    $ npm install unidecode

## Usage

    $ node
    > var unidecode = require('unidecode');
    > unidecode("aéà)àçé");
    'aea)ace'
    > unidecode("に間違いがないか、再度確認してください。再読み込みしてください。");
    'niJian Wei iganaika, Zai Du Que Ren sitekudasai. Zai Du miIp misitekudasai. '
