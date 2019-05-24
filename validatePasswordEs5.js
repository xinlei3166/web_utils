// 正则匹配
var reg = new RegExp("^(?=.*[a-z]|[A-Z])(?=.*[0-9])(?=.*[!\"#$%&'()*+,./:;<=>?\\\\@[\\]^\\-_`{|}~])[A-Za-z0-9!\"#$%&'()*+,./:;<=>?\\\\@[\\]^\\-_`{|}~]{8,16}$");
function match(str) {
    return reg.test(str)
}

// 定义横向穷举
var keyCode = [
    ["`~·", "1!！", "2@", "3#", "4$￥", "5%", "6^……", "7&", "8*", "9(（", "0）)", "-_", "=+"],
    [" ","qQ", "wW", "eE", "rR", "tT", "yY", "uU", "iI", "oO", "pP", "[{【", "]}】", "\\|、"],
    [" ","aA", "sS", "dD", "fF", "gG", "hH", "jJ", "kK", "lL", ";:", "\'\"’“"],
    [" ","zZ", "xX", "cC", "vV", "bB", "nN", "mM", ",《<", ".>》", "/?？"]
];

// 密码复杂性校验之：密码不得包含键盘上任意连续的四个字符或shift转换字符
function validateKey(str) {
    // 找出给出的字符串，每个字符，在坐标系中的位置
    var strArr = str.split('');
    var x = [];
    var y = [];
    for (var index=0; index<strArr.length; index++) {
        for (var k=0; k<keyCode.length; k++) {
            var xItem = keyCode[k];
            for (var j=0; j<xItem.length; j++) {
                var yItem = xItem[j];
                if (yItem.indexOf(String(strArr[index])) !== -1) {
                    x.push(k);
                    y.push(j);
                    break
                }
            }
        }
    }

    var validation = true;

    for (var i = 0; i < x.length - 2; i++) {
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

var letter = ['aA', 'bB', 'cC', 'dD', 'eE', 'fF', 'gG', 'hH', 'iI', 'jJ', 'kK', 'lL', 'mM', 'nN', 'oO', 'pP', 'qQ', 'rR', 'sS', 'tT', 'uU', 'vV', 'wW', 'xX', 'yY', 'zZ', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

function validateLogicAdjoin(str) {
    var strArr = str.split('');
    var findIndexArr = [];
    for (var index=0; index<strArr.length; index++) {
        for (var l=0; l<letter.length; l++) {
            if (letter[l].indexOf(String(strArr[index])) !== -1) {
                findIndexArr.push(l);
            }
        }
    }

    for (var i=0; i < findIndexArr.length-2; i++) {
        if (findIndexArr[i + 1] - findIndexArr[i] === 1 && findIndexArr[i + 2] - findIndexArr[i + 1] === 1) {
            return false
        }
    }
    return true
}

function formatValue(val) {
    return String(val).toLowerCase()
}

function validateRepetition(str, continuity){
    var strArr = str.split('');
    if (continuity) {
        for (var i=0; i < strArr.length-2; i++) {
            if (formatValue(strArr[i + 1]) === formatValue(strArr[i]) && formatValue(strArr[i + 2]) === formatValue(strArr[i + 1])) {
                return false
            }
        }
    } else {
        var m = {};
        for (var index=0; index<strArr.length; index++) {
            var key = String(strArr[index]);
            if (m[key]) {
                m[key] = m[key] + 1;
            } else {
                m[key] = 1
            }
        }
        for (var k in m) {
            if (m[k] >= 3) {
                return false
            }
        }
    }
    return true
}

function validateIsContainsUsername(str, username) {
    var reg = new RegExp('' + username, "ig");
    return !reg.test(str);
}

// 使用此函数验证密码
function validatePassword(str, username) {
    return match(str) && validateKey(str) && validateLogicAdjoin(str) && validateRepetition(str, false) && validateIsContainsUsername(str, username)
}

/*
Example:
    validatePassword('qwdr!@ab1357902v', 'abc')
    结果为true表示验证通过。
*/
// console.log(validatePassword('qq5@5788502Q.', 'abc'))
