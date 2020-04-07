const field = {
  1: '学员手机号',
  2: '学员姓名',
  3: '学员班管姓名',
  4: '学员CC姓名'
}

const filterDictRelationIdField = ids => {
  const arr = Object.entries(field).map(([k, v]) => ({ label: v, value: parseInt(k) }))
  return arr.filter(x => ids.includes(x.value))
}
// console.log(filterDictRelationIdField([1, 2]))
