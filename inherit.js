// function A() {
//     this.a = 'A'
// }
//
// A.prototype.showA = function () {
//     console.log(this.a)
// };
//
// function B() {
//     A.call(this);
//     this.b = 'B'
// }
//
// B.prototype = Object.create(A.prototype);
// B.prototype.constructor = B;
// B.prototype.showB = function () {
//     console.log(this.b)
// };
//
// b = new B();
// b.showA();
// b.showB();
// console.log('b instanceof B: ', b instanceof B);
// console.log('b instanceof A: ', b instanceof A);

function inherit(parent, child) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
}

function A(a) {
    this.a = a
}

A.prototype.showA = function () {
    console.log(this.a)
};

function B(a, b) {
    A.call(this, a);
    this.b = b
}

inherit(A, B);  // 继承

B.prototype.showB = function () {
    console.log(this.b)
};

b = new B('aaa', 'bbb');
console.log(b.a);
console.log(b.b);
b.showA();
b.showB();
console.log('b instanceof B: ', b instanceof B);
console.log('b instanceof A: ', b instanceof A);
