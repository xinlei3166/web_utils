// 小于10的数据补0
export const suppleZero = (value) => {
    return value < 10 ? '0' + value : value
};

// 格式化日期时间
export const formatDatetime = (time) => {
    const d = new Date(time);
    return `${d.getFullYear()}-${suppleZero((d.getMonth() + 1))}-${suppleZero(d.getDate())} ${suppleZero(d.getHours())}:${suppleZero(d.getMinutes())}:${suppleZero(d.getSeconds())}`;
};

// 格式化日期
export const formatDate = (time) => {
    const d = new Date(time);
    return `${d.getFullYear()}-${suppleZero((d.getMonth() + 1))}-${suppleZero(d.getDate())}`;
};
