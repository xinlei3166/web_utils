function fab(n) {
    let l = [1, 1];
    for (let i=2; i<n; i++) {
        l[i] = l[i-1] + l[i-2];
    }
    return l;
}

function fab2(n) {
    let a = 1;
    let b = 1;
    let c;
    for (let i=0; i<n; i++) {
        c = a;
        a = b;
        b = c + a;
        console.log(c)
    }
}
