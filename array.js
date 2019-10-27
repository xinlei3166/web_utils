let row = 1

let arr= Array.from({length:20}).map((item, index) => row)

// 快速复制数组的几种方法
const arr = [1, 2, 3]
const newArr = [...arr]
const newArr1 = Array.from(arr, x => x)
const newArr2 = arr.map(x => x)
const newArr3 = arr.slice();
