### [[class]] & Symbol.toStringTag
Symbol.toStringTag 为对象的默认tag
当使用 Object.prototype.toString把对象转换为string时，会默认使用这个stringTag
比如 "[object Object]"

这个Tag 也是对象的 [[class]] 内置属性

注意 必须是Object.prototype.toSting才会打印Tag 

```javascript
// 各种内置对象的 toString() 结果
console.log(Object.prototype.toString.call({}));      // "[object Object]"
console.log(Object.prototype.toString.call([]));      // "[object Array]"
console.log(Object.prototype.toString.call(new Date())); // "[object Date]"
console.log(Object.prototype.toString.call(/regex/)); // "[object RegExp]"
console.log(Object.prototype.toString.call(function(){})); // "[object Function]"
console.log(Object.prototype.toString.call(null));    // "[object Null]"
console.log(Object.prototype.toString.call(undefined)); // "[object Undefined]"
console.log(Object.prototype.toString.call(123));     // "[object Number]"
console.log(Object.prototype.toString.call("hello")); // "[object String]"
console.log(Object.prototype.toString.call(true));    // "[object Boolean]"
console.log(Object.prototype.toString.call(Symbol())); // "[object Symbol]"
```