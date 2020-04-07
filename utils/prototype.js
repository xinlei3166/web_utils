function A(a) {
    this.a = a
    return this.a
}
console.log(A.prototype.__proto__);
A.prototype.__proto__ = {
    show: function () {
        console.log(this.a*3)
    }
}
console.log(A.prototype.__proto__.__proto__.__proto__);
