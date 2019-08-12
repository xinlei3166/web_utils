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
