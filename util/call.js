function show () {
  this.name = 'show'
  console.log(this.name)
}

let obj = {
  name: 'obj',
  show() {
    console.log('obj-show')
  }
}

show.call(obj)

Function.prototype.myCall = function(context, ...args) {
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
}

show.myCall(obj, 'name');
