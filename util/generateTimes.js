function generateTimes(start, end) {
  let arr = [{ label: '全部', value: -1 }]
  for (let i = start; i < end; i++) {
    arr.push({ label: `${i}:00～${i}:30`, value: `${i}:00～${i}:30` })
    arr.push({ label: `${i}:30～${i + 1}:00`, value: `${i}:30～${i + 1}:00` })
  }
  return arr
}
