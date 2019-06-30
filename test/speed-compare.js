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

var basicMultilingualPlane = '';

for (var i = 0; i <= 0xFFFF; ++i) {
  if (i === 0xD800)
    i += 0x800;

  basicMultilingualPlane += fromCodePoint(i);
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
  transliterated = unidecode(basicMultilingualPlane);

var now = processMillis();

console.log('unidecode:', now - start);

start = now;

for (i = 0; i < repeats; ++i)
  transliterated = unidecodeOld(basicMultilingualPlane);

now = processMillis();

console.log('unidecode-old:', now - start);

start = now;

for (i = 0; i < repeats; ++i)
  transliterated = unidecode(basicMultilingualPlane, { smartSpacing: true });

now = processMillis();

console.log('unidecode, smart spacing:', now - start);
