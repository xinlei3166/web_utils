let str = 'a2b1c1d1f1g1h1f1';
// var addCharacter = (str, interval) => str.match(RegExp(`(\\w{${interval}})`, 'g')).join('-')
var addCharacter = (str, interval) => str.match(RegExp("(.{" + interval + "})", 'g')).join('-')
