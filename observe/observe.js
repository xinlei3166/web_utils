function observe(data) {
    const self = this;
    let handler = {
        get(target, property) {
            return target[property];
        },
        set(target, key, value) {
            let res = Reflect.set(target, key, value);
            self.subscribe[key].map(item => {
                item.update();
            });
            return res;
        }
    }
    this.$data = new Proxy(data, handler);
}
