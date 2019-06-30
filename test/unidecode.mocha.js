/**
 * Tests are taken from Text-Unidecode-0.04/test.pl, with additional tests added.
 *
 * @see <http://search.cpan.org/~sburke/Text-Unidecode-0.04/lib/Text/Unidecode.pm>
 */

'use strict';

/* global describe, it */

var assert = require('assert');
var unidecode = require('../unidecode');

describe('Purity tests', function(){
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
		it(test, function(){
			var exp = test;
			var res = unidecode(test.toString());
			assert.equal(res, exp);
		});
	});
});

describe('Complex tests', function(){
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
	];

	tests.forEach(function(test) {
		it(test[0] + ' --> ' + test[1], function(){
			var exp = test[1];
			var res = unidecode(test[0]);
			assert.equal(res, exp);
		});
	});
});
