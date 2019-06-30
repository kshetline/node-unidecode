/**
 * Unidecode takes full-range Unicode text and tries to represent it using US-ASCII characters (i.e., the universally
 * displayable characters between 0x00 and 0x7F). The representation is almost always an attempt at transliteration --
 * i.e., conveying, in Roman letters, the pronunciation expressed by the text in some other writing system. Some of the
 * transliterations go for matching the _shape_ of characters rather than their pronunciation, such as transliterating
 * the Greek letter `ρ` (rho) as the ASCII `p`, even though it sounds more like an `r`.
 *
 * The tables used (in data) are converted from the tables provided in the perl libraryText::Unidecode
 * (http://search.cpan.org/dist/Text-Unidecode/lib/Text/Unidecode.pm) and are distributed under the perl license.
 *
 * Whereas the original JavaScript and Perl versions of Unidecode only worked the Unicode Basic Multilingual Plane
 * (BMP, U+0 to U+FFFF), this version also handles transliteration of some characters beyond the BMP, like popular
 * emojis.
 *
 * @author Kerry Shetline
 *
 * Based on Francois-Guillaume Ribreau's unidecode, which in turn was based on a port of unidecode for php.
 */

'use strict';

var tr = {};

if (!String.prototype.codePointAt) {
  String.prototype.codePointAt = function(index) {
    if (index >= this.length)
      return NaN;

    var code = this.charCodeAt(index);

    if (0xD800 <= code && code <= 0xDBFF) {
      var surr = this.charCodeAt(index + 1);

      if (!isNaN(surr) && 0xDC00 <= surr && surr <= 0xDFFF)
        code = 0x10000 + ((code - 0xD800) << 10) + (surr - 0xDC00);
    }

    return code;
  };
}

if (!String.prototype.trim) {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, '');
  };
}

var codepoints;

try {
  // Can we use Unicode-aware regexes?
  codepoints = /[^\x00-\x7F]/gu; // jshint ignore:line
}
catch (err) {
  // Nope! This mess will have to do.
  codepoints = /(?:[\x80-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g;
}

var german = false;
var smartSpacing = false;

module.exports = function unidecode(str, options) {
  german = options && options.german;
  smartSpacing = options && options.smartSpacing;

  var result = str.replace(codepoints, unidecode_internal_replace);

  if (!smartSpacing)
    return result;

  return result.replace(/\x80(?!\w)/g, '').replace(/\x80\x80|(\w)\x80/g, '$1 ').replace(/\x80/g, '');
};

function unidecode_internal_replace(ch) {
  var cp = ch.codePointAt(0), ch0 = ch;

  var high = cp >> 8;
  var row = high + (high === 0 && german ? 0.5 : 0);
  var low = cp & 0xFF;

  if (0x18 < high && high < 0x1E || 0xD7 < high && high < 0xF9)
    return '';
  else if (high > 0xFF && high !== 0x1F4 && high !== 0x1F6 /* && high !== 0x1F9 */) {
    return '_';
  }

  if (!tr[row]) {
    try {
      tr[row] = require('./data/x' + (row < 0x10 ? '0' : '') + row.toString(16));

      // I'm not sure why, but a fair number of the original data tables don't contain a full 256 items.
      if (tr[row].length < 256) {
        var start = tr[row].length;
        tr[row].length = 256;
        tr[row].fill('_', start);
      }
    }
    catch (err) {
      tr[row] = new Array(256).fill('_');
    }
  }

  ch = tr[row][low];

  if (!smartSpacing || /^\w+$/.test(ch) || /^:.+:$/.test(ch))
    return ch;
  else
    return '\x80' + ch.trim() + '\x80';
}
