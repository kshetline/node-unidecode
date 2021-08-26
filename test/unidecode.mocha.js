/**
 * Tests are taken from Text-Unidecode-0.04/test.pl, with additional tests added.
 *
 * @see <http://search.cpan.org/~sburke/Text-Unidecode-0.04/lib/Text/Unidecode.pm>
 */

'use strict';

/* global describe, it */

var assert = require('assert');
var unidecode = require('../unidecode');

describe('Purity tests', function() {
  var code;
  var tests = [];

  for(code = 0; code <= 127; code++) {
    tests.push(String.fromCharCode(code));
  }

  tests.forEach(function(test) {
    it(test.charCodeAt(0).toString(16) + ' ' + test, function() {
      var exp = test;
      var res = unidecode(exp);
      assert.equal(res, exp);
    });
  });
});

describe('Basic string tests', function() {
  var tests = [
    '',
    1/10,
    'I like pie.',
    '\n',
    '\r\n', // "\cm\cj" - perl control chars Ctrl+M, CTRL+J === \r\n
    'I like pie.\n',
  ];

  tests.forEach(function(test) {
    it(test.toString(), function(){
      var exp = test;
      var res = unidecode(test.toString());
      assert.equal(res, exp);
    });
  });
});

describe('Complex tests', function() {
  var tests = [
    ['Æneid', 'AEneid'],
    ['étude', 'etude'],
    ['北亰', 'Bei Jing '], // Chinese
    ['ᔕᓇᓇ', 'shanana'], // Canadian syllabics
    ['ᏔᎵᏆ', 'taliqua'], // Cherokee
    ['\u0726\u071b\u073d\u0710\u073a', "ptu'i"], // Syriac
    ['अभिजीत', 'abhijiit'], // Devanagari
    ['অভিজীত', 'abhijiit'], // Bengali
    ['അഭിജീത', 'abhijiit'], // Malayalaam
    ['മലയാലമ്', 'mlyaalm'], // the Malayaalam word for 'Malayaalam'
    // (Yes, if we were doing it right, that'd be 'malayaalam', not 'mlyaalm'.)
    ['げんまい茶', 'genmaiCha '], // Japanese, astonishingly unmangled.
    ['❝This is ❛decorative❜ punctuation❉, ❴2❌5❵ ➪ ❿❞', '"This is \'decorative\' punctuation*, {2 X 5} --> (10)"'] // Decorative punctuation, arrows, etc.
  ];

  tests.forEach(function(test) {
    it(test[0] + ' --> ' + test[1], function(){
      var exp = test[1];
      var res = unidecode(test[0]);
      assert.equal(res, exp);
    });
  });
});

describe('Smart spacing', function() {
  it('should remove extraneous spaces and add spaces where needed', function() {
    assert.equal(unidecode('Café 北京, 鞋 size 10½, 33⅓ RPM', { smartSpacing: true }), 'Cafe Bei Jing, Xie size 10 1/2, 33 1/3 RPM');
  });

  it('should replace an em-dash straddled by word characters with " - " instead of "--"', function() {
    assert.equal(
      unidecode("No—I mean yes!", { smartSpacing: true }), "No - I mean yes!");
    assert.equal(
      unidecode("#—#", { smartSpacing: true }), "#--#");
  });

  it('should leave ASCII double dashes unchanged', function() {
    assert.equal(
      unidecode("No--I mean yes!", { smartSpacing: true }), "No--I mean yes!");
  });

  it('should handle deferred smart spacing', function() {
    var str = unidecode('Café 北京, 鞋 size 10½, 33⅓ RPM', { deferredSmartSpacing: true });
    assert.ok(/[\x80\x81]/.test(str));
    assert.equal(unidecode.resolveSpacing(str), 'Cafe Bei Jing, Xie size 10 1/2, 33 1/3 RPM');
  });
});

describe('German umlaut handling', function() {
  it('should strip umlauts but not add an "e" by default', function() {
    assert.equal(unidecode('ÄäÖöÜü, Schrödinger'), 'AaOoUu, Schrodinger');
    assert.equal(unidecode('A\u0308a\u0308O\u0308o\u0308U\u0308u\u0308'), 'AaOoUu');
  });

  it('should strip umlauts and add an "e" in German mode', function() {
    assert.equal(unidecode('ÄäÖöÜü, Schrödinger', { german: true }), 'AEaeOEoeUEue, Schroedinger');
    assert.equal(unidecode('A\u0308a\u0308O\u0308o\u0308U\u0308u\u0308', { german: true }), 'AEaeOEoeUEue');
  });
});

describe('Emoji handling', function() {
  it('should render basic emojis', function() {
    assert.equal(unidecode('👀👁💙😀😁😇 😈😘😱'), ':eyes::eye:<3:-):-DO:-) >:-):-*=:-O');
  });

  it('should render basic emojis with smart spacing', function() {
    assert.equal(unidecode('👀👁💙😀😁😇 😈😘😱', { smartSpacing: true }), ':eyes: :eye: <3 :-) :-D O:-)  >:-) :-* =:-O');
  });
});

describe('Skip ranges', function() {
  it('should transliterate only characters outside of the specified skip ranges', function() {
    assert.equal(unidecode('Café 北京, 👀👁💙😀😁😇 😈😘😱',
      { skipRanges: [[0x0, 0xFFFF]], smartSpacing: true }), 'Café 北京, :eyes: :eye: <3 :-) :-D O:-)  >:-) :-* =:-O');
  });
});
