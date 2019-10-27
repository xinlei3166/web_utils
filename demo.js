const reg = /^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([\/\w.-]*)*\/?$/
console.log(reg.test('https://www-asd.baidu.com/asdad'))
console.log(reg.test('www.baidu.com/asdad'))

