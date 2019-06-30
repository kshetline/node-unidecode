var unidecode = require('../unidecode');
var unidecodeOld = require('../unidecode-old');

var fromCodePoint = String.fromCodePoint;

if (!fromCodePoint) {
  fromCodePoint = function(cp) {
    if (cp < 0x10000)
      return String.fromCharCode(cp);

    cp -= 0x10000;

    return String.fromCharCode(0xD800 | (cp >> 10)) +
           String.fromCharCode(0xDC00 + (cp & 0x3FF));
  };
}

var allCharsStr = '';

for (var i = 0; i <= 0xFFFF /* 0x10FFFF */; ++i) {
  if (i === 0xD800)
    i += 0x800;

  allCharsStr += fromCodePoint(i);
}

function processMillis() {
  if (process.hrtime.bigint)
    return Number(process.hrtime.bigint()) / 1000000;
  else {
    var time = process.hrtime();

    return time[0] * 1000 + time[1] / 1000000;
  }
}


var start = processMillis();
var transliterated;
var repeats = 100;

for (i = 0; i < repeats; ++i)
  transliterated = unidecode(allCharsStr);

var now = processMillis();

console.log('unidecode:', now - start);

start = now;

for (i = 0; i < repeats; ++i)
  transliterated = unidecodeOld(allCharsStr);

now = processMillis();

console.log('unidecode-old:', now - start);

start = now;

for (i = 0; i < repeats; ++i)
  transliterated = unidecode(allCharsStr, { smartSpacing: true });

now = processMillis();

console.log('unidecode, smart spacing:', now - start);

// var sb = [];
// for (var cp = 0x1F600; cp <= 0x1F6FF; ++cp)
//   sb.push('"' + String.fromCodePoint(cp) + '"');
//
// var data = 'module.exports = [ ' + sb.join() + ' ];';
// console.log(data);

console.log(unidecode('Schrödinger'));
console.log(unidecode('Schrödinger', { german: true }));

console.log(unidecode('Café 北京, 鞋 size 10½'));
console.log(unidecode('Café 北京, 鞋 size 10½', { smartSpacing: true }));
