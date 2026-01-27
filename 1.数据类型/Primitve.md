## @@toPrimitive 是引擎内部的逻辑 用来把复杂类型转换成基础类型

其逻辑为

```javascript
function @@toPrimitive(input,hint = 'default'){
    if(isPrimitive(input)) return hint
    if(typeof input[Symbol.toPrimitive] === 'function'){
        const mayBePrimitive = input[Symbol.toPrimitive](hint)
        if(isPrimitive(mayBePrimitive)) return mayBePrimitive
        throw new Err('can not convert')
    }

    // 先string 后value
    if(hint === 'string'){
        let res = input.toString()
        if(isPrimitive(res)) return res
        res = input.valueOf()
         if(isPrimitive(res)) return res
    }else{
        // hint is default / number 先valueOf
         let res = input.valueOf()
         if(isPrimitive(res)) return res
          let res = input.toString()
        if(isPrimitive(res)) return res
    }

    throw new Err('Cannot convert object to primitive value')
}
```

### Symbol.toPrimitive

是对象的一个内置属性，我们可以改写这个函数来影星 @@toPrimitive 的行为
[Symbol.toPrimitive] = hint => shouldBePrimitive
