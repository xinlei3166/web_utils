// 带http[s]前缀的标准url正则
const urlPattern = /^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([\/\w.-]*)*\/?$/

// 判读带4个*或不带*的11位手机号码
const phonePattern = /^1[3,4,5,6,7,8,9]\d(\*{4}|\d{4})\d{4}/
