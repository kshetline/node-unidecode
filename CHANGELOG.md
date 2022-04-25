# Change Log

## 1.0.4 

* Security and documentation updates.

## 1.0.3

* Special handling for em dashes: In smart spacing mode, em dashes become " - " instead of "--" when found between words.

## 1.0.2

* German mode now works with combining umlaut (diaeresis).

## 1.0.1

* Fixed typings.

## 1.0.0

* Forked this project from v0.1.8 of [unidecode](https://github.com/fgribreau/node-unidecode/tree/v0.1.8).
* Improved performance -- around 2X the speed of the original.
* Added support beyond the Unicode Basic Multilingual Plane for transforming many emoji into ASCII-art equivalents.
* Added a "smart spacing" mode that improves the rendering of text such as "10½", so it comes out as "10 1/2" instead of "101/2".
* Added German mode to convert characters like "ö" into "oe" instead of "o".
* Allows you to skip ranges of characters so that some non-ASCII characters remain untouched, while only other the characters are transliterated. You can, for example, keep accented characters and Chinese characters while only transliterating emoji.
* Fixed a bug that transliterated `Ý` to `U` instead of `Y`.
