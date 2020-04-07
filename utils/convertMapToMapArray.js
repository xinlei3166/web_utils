function convertMapToMapArray (obj, key1, key2) {
  let arr = []
  for (let k in obj) {
    arr.push({ [key1]: k, [key2]: obj[k]})
  }
  return arr
}

const obj = {
  '-1': '全部',
  '1': '周一',
  '2': '周二',
  '3': '周三',
  '4': '周四',
  '5': '周五',
  '6': '周六',
  '7': '周日'
}

console.log(convertMapToMapArray(obj, 'value', 'label'))
