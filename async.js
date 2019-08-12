async function hello(a, b) {
    if (a !== 0) {
        throw new Error('hello a不为0')
    }
    return a / b
}

async function call(a, b) {
    if (a !==0) {
        throw new Error('call a不为0')
    }
    return await hello(a, b)
}

(async () => {
    try {
        console.log(await call('as', 3))
    } catch (e) {
        console.log(e)
    }
})()

