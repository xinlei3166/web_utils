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

// 两次时间的差值换算为小时和分钟
const end = new Date('2019-11-07 00:00:00')
const start = new Date()

const timeDifferenceToHourAndMinute = (start, end) => {
    let startTimestamp
    let endTimestamp
    if (start instanceof Date) {
        startTimestamp = start.getTime()
    } else {
        start = start.replace(/-/g, '/')
        startTimestamp = new Date(start).getTime()
    }
    if (end instanceof Date) {
        endTimestamp = end.getTime()
    } else {
        end = end.replace(/-/g, '/')
        endTimestamp = new Date(end).getTime()
    }
    const difference = endTimestamp - startTimestamp
    const perHour = 60 * 60 * 1000
    const perMinute = 60 * 1000
    let hour
    let minute
    if (difference <= 0) {
        hour = 0
        minute = 0
    } else {
        hour = Math.floor(difference / perHour)
        minute = Math.floor(difference % perHour / perMinute)
    }
    return { hour: hour, minute: minute }
}
