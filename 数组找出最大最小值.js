l = [2, 1, 4, 3, 7, 9, 8];
l.sort((x, y) => x - y);
console.log(l[0]);
console.log(l[l.length - 1]);
console.log(Math.min.apply(null, l));
console.log(Math.max.apply(null, l));

