// l = [{a: 2, b: 2}, {a:1, b:1}, {a:3, b:1}];
// l.sort((x, y) => x.a - y.a);
// console.log(l);

// let a = true
// let b = {}
// let c = undefined
// let d = undefined
// const authList = [a, b, c, d]
// const authIndex = authList.findIndex((item) => item)
//
// console.log(b && a)

let l = [1, 2, 3]

let l1 = l.filter(item => {
  return item < 1
})

let i = -1

// console.log(i ? 1: 2)

let t = [
  {
    id: 1,
    mobile: '111'
  }
]

let t1 = t.map(x => ({id: x.id, name: x.mobile}))

let arr = [1, 2, 3]

function filter (item) {
  return item > 1
}

let newArr = arr.filter(filter)
// console.log(newArr)

let reg = /^[12]$/
// console.log(reg.test('1'))

let arr1 = []

let objArr = [
  {a: 1},
  {a: 2},
]

arr1.push(...objArr)
let t11= [undefined]
arr1[0] = t11[0]

// console.log(arr1)

let s = '哈哈啊瑞文'
// console.log(s.slice(s.length-2, s.length))

let oa = {
  col1: ['a', 'b'],
  col2: ['c', 'd'],
  col3: ['e', 'f'],
}

let arrq = []

for (let i of Object.values(oa)) {
  arrq.push(...i)
}
// console.log(arrq)

let eml = []


let nc = eml[0] && eml[0].i ? eml[0].i : '1'
// console.log(nc)

let c1 = undefined
let c2 = null
let c3 = ''

let b = {host: 3}

const {
  host = 1,
  port = 2000
} = b

console.log(host)
console.log(port)
console.log(b)
