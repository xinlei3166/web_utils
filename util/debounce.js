/**
 * 函数防抖
 * @param method
 * @param delay
 * @return {Function}
 */
function debounce(method, delay) {
    let timer = null;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            console.log(this)
            method.call(context, args);
        }, delay);
    }
}


