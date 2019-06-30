# Change Log

## 1.0.0

* Forked this project from v0.1.8 of [unidecode](https://github.com/fgribreau/node-unidecode/tree/v0.1.8).
* Improved performance -- around 2X the speed of the original.
* Added support beyond the Unicode Basic Multilingual Plane for transforming many emoji into ASCII-art equivalents.
* Added a "smart spacing" mode that improves the rendering of text such as "33⅓ RPM", so it comes out as "33 1/3 RPM" instead of "331/3 RPM".
* Added German mode to convert characters like "ö" into "oe" instead of "o".
* Fixed a bug that transliterated `Ý` to `U` instead of `Y`.
