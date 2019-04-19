function* triangles(n) {
    let ret = [1];
    let pre = [...ret];
    while (n > 0) {
        yield ret;
        for (let i=1; i<ret.length; i++) {
            ret[i] = pre[i] + pre[i-1];
        }
        ret.push(1);
        pre = [...ret];
        n--
    }
}

for (let i of triangles(6)) {
    console.log(i)
}
