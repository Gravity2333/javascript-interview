## JSON 安全

### 什么是 JSON 不安全的

```
function
NaN Infinity -Infinity
undefined
没有实现toJson的对象
```

### 如何处理

```
函数 undefined -> 数组 null/ 对象直接消失
NaN Infinity 数组null / 对象 null
Date 会转换成字符串 RegExp转换为空对象(没实现toJSON)
循环引用报错！
原型链会丢失，内置的不会!

-> 面试题 为什么不用JSON.parse(JSON.stringify(origin)) 拷贝对象
```
