// 正则匹配qwdr!@ab1357902v
const reg = new RegExp("^(?=.*[a-z]|[A-Z])(?=.*[0-9])(?=.*[!\"#$%&'()*+,./:;<=>?@^_`{|}~])[A-Za-z0-9!\"#$%&'()*+,./:;<=>?@^_`{|}~]{8,16}$");
function match(str) {
    return reg.test(str)
}

// 定义横向穷举
const keyCode = [
    ["`~·", "1!！", "2@", "3#", "4$￥", "5%", "6^……", "7&", "8*", "9(（", "0）)", "-_", "=+"],
    [" ","qQ", "wW", "eE", "rR", "tT", "yY", "uU", "iI", "oO", "pP", "[{【", "]}】", "\\|、"],
    [" ","aA", "sS", "dD", "fF", "gG", "hH", "jJ", "kK", "lL", ";:", "\'\"’“"],
    [" ","zZ", "xX", "cC", "vV", "bB", "nN", "mM", ",《<", ".>》", "/?？"],
];

// 密码复杂性校验之：密码不得包含键盘上任意连续的四个字符或shift转换字符
function validateKey(str) {
    // 找出给出的字符串，每个字符，在坐标系中的位置
    const strArr = str.split('');
    let x = [];
    let y = [];
    for (let item of strArr) {
        for (let [xIndex, xItem] of keyCode.entries()) {
            for (let [yIndex, yItem] of xItem.entries()) {
                if (yItem.includes(String(item))) {
                    x.push(xIndex);
                    y.push(yIndex);
                    break;
                }
            }
        }
    }

    let validation = true;

    for (let i = 0; i < x.length - 2; i++) {
        // 如果X一致，那么就是在一排
        if (x[i] === x[i + 1] && x[i + 1] === x[i + 2]) {  // 四者在同一行上
            if (y[i] > y[i + 2]) {
                if (y[i] - 1 === y[i + 1] && y[i] - 2 === y[i + 2]) {
                    validation = false;
                    break;
                }
            } else {
                if (y[i] + 1 === y[i + 1] && y[i] + 2 === y[i + 2]) {
                    validation = false;
                    break;
                }
            }

        } else if (x[i] !== x[i + 1]
            && x[i] !== x[i + 2]
            && x[i + 1] !== x[i + 2]
        ) { // 四者均不在同一行上,但是如果y相同，说明是一列
            if (y[i] === y[i + 1] && y[i + 1] === y[i + 2]) {
                validation = false;
                break;
            }
        }

    }
    return validation;
}

const letter = ['aA', 'bB', 'cC', 'dD', 'eE', 'fF', 'gG', 'hH', 'iI', 'jJ', 'kK', 'lL', 'mM', 'nN', 'oO', 'pP', 'qQ', 'rR', 'sS', 'tT', 'uU', 'vV', 'wW', 'xX', 'yY', 'zZ', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

function validateLogicAdjoin(str) {
    const strArr = str.split('');
    let findIndexArr = [];
    for (let item of strArr) {
        for (let [index, value] of letter.entries()) {
            if (value.includes(String(item))) {
                findIndexArr.push(index);
            }
        }
    }

    for (let i=0; i < findIndexArr.length-2; i++) {
        if (findIndexArr[i + 1] - findIndexArr[i] === 1 && findIndexArr[i + 2] - findIndexArr[i + 1] === 1) {
            return false
        }
    }
    return true
}

function validateRepetition(str){
    const strArr = str.split('');
    let m = new Map();
    for (let item of strArr) {
        if (m.has(item)) {
            let count = m.get(item);
            count += 1;
            m.set(item, count)
        } else {
            m.set(item, 1)
        }
    }
    for (let value of m.values()) {
        if (value >= 3) {
            return false
        }
    }
    return true
}

function validateIsContainsUsername(str, username) {
    const reg = new RegExp(`${username}`, "ig");
    return !reg.test(str);
}

// 使用此函数验证密码
function validatePassword(str, username) {
    return match(str) && validateKey(str) && validateLogicAdjoin(str) && validateRepetition(str) && validateIsContainsUsername(str, username)
}

/*
Example:
    validatePassword('qwdr!@ab1357902v', 'abc')
    结果为true表示验证通过。
*/
