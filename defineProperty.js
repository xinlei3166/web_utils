data = {
    a: 1
}

// Object.keys(data).map(function(key) {
//     Object.defineProperty(data, key, {
//         enumerable: true,//可枚举
//         configurable: true,//可改变
//         get: function() {
//             console.log('get');
//         },
//         set: function(newVal) {
//             // 当属性值发生变化时我们可以进行额外操作
//             console.log(`大家好,我是${newVal}`);
//         },
//     });
// });

// data.c = 3

let b;
Object.defineProperty(data, 'b', {
    enumerable: true,//可枚举
    configurable: true,//可改变
    get: function() {
        console.log(b);
    },
    set: function(newVal) {
        // 当属性值发生变化时我们可以进行额外操作
        console.log(`大家好,我是${newVal}`);
    },
});

data.b = [];
data.b = [1,2,3];
data.b[1] = 3;

