// 余弦（余弦函数），三角函数的一种。在Rt△ABC（直角三角形）中，∠C=90°，∠A的余弦是它的邻边比三角形的斜边，即cosA=b/c，也可写为cosa=AC/AB。余弦函数：f(x)=cosx（x∈R）。
// cos返回数的余弦
const angle = 60  // 假设角度为60度
const radian = angle * Math.PI / 180  // 计算出弧度
const cos = Math.cos(radian)
console.log(cos) // 输出cos 60度的值

const b = 20  // 邻边
let c // 斜边
c = b / cos
console.log(c) // 输出斜边c的值

