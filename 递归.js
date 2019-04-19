let l = [
    {'name': '一级分类', 'id': 1, 'pid': null},
    {'name': '二级分类', 'id': 2, 'pid': 1},
    {'name': '三级分类', 'id': 3, 'pid': 2},
    {'name': '四级分类', 'id': 4, 'pid': 3},
];

function recursion(obj) {
    obj.childs = [];
    for (let i of l) {
        if (i.pid === obj.id) {
            obj.childs.push(recursion(i));
        }
    }
    return obj;
}

for (let obj of l) {
    if (obj.pid === null) {
        const res = recursion(obj);
        console.log(JSON.stringify(res))
    }
}
