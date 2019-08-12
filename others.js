// console.log([1<2<3, 3<2<1])
//
// let obj = {}
// obj.prototype = Object.prototype
// console.log(obj.prototype === Object.prototype, Object.getPrototypeOf(obj) === Object.prototype)
//
// function F() {
//     console.log('f')
// }
// f1 = new F()
//
// console.log(f1.__proto__.constructor)

// let l = [1, 10, -6, 3, 21, -16, 24]

let arr = [1, 2, 3, 4]
function sumAdjacentEleByArr(arr) {
    var sum;
    var l = arr.length; // 数组的长度
    for (var a=2; a<=l; a++) {  // a表示相邻个数
        console.log("----%d----\n", a);
        for (var f=0; f<=l-a; f++) {    // 根据相邻个数算出循环次数
            sum = arr[f];
            console.log(sum);
            for (var i=f+1; i<f+a; i++) {
                sum += arr[i];
                console.log("+", arr[i]);
            }
            console.log("=%d\n", sum);
        }
    }
}

console.log(sumAdjacentEleByArr(arr))
