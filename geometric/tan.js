// 在Rt△ABC（直角三角形）中，∠C=90°，AB是∠C的对边c，BC是∠A的对边a，AC是∠B的对边b，正切函数就是tanB=b/a，即tanB=AC/BC。
const angle = 60  // 假设角度为60度
const radian = angle * Math.PI / 180  // 计算出弧度
const tan = Math.tan(radian)
console.log(tan) // 输出tan 60度的值

const b = 20 // ∠B的对边b
let a // ∠A的对边a
a = b / tan
console.log(a)  // 输出∠A的对边a的值
