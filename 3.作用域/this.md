## this 指向问题
```
1. 全局执行上下文中 this指向window/global 即 OER 对象环境记录器
2. 函数执行上下文中 this在非严格模式下指向 OER 严格模式下指向undefined

this指向可以修改
1. 隐修改 通过对象调用 this指向对象
2. 显修改 通过 bind call apply
3. new 中 this指向创建的对象

特殊情况
1. 箭头函数 没有this binding 其中的this指向outer
2. 用户dom事件函数中的this指向触发事件的 DOM 元素
```

### 题目
```javascript
"use strict"
var a = 123
function foo(){
    console.log(this.a) // 这里报错 严格模式下 foo中的this指向undefined
}
```


```javascript
function foo(){
    console.log(this.a)
}
var a = 2
var o = {a: 3,f00: foo}
var p = {a:4}

o.foo() // 3 指向调用者
(p.foo = o.foo)() // 丢失 a 指向window
```

```javascript
const obj = {
    a: 100,
    b: {
        a: 200,
        c:{
            a: 300,
            foo(){
              console.log(  this.a) // 300
            }
        }
    }
}

obj.b.c.foo()
// obj.b.c -> 一个对象地址 x x.foo()
```

```javascript
基础题（10题）
1. 全局作用域
javascript
console.log(this);  // window

2. 严格模式
javascript
'use strict';
function test() {
    console.log(this); // undefined 严格模式下 函数作用域内 this. undefined
}
test();

3. 对象方法
javascript
const obj = {
    name: 'obj',
    sayName() {
        console.log(this.name); 
    }
};

const say = obj.sayName; // 丢失 say是sayName的地址，直接调用 非严格模式 this window
say();


4. 嵌套对象
javascript
const obj = {
    name: 'obj',
    inner: {
        name: 'inner',
        sayName() {
            console.log(this.name);
        }
    }
};

obj.inner.sayName(); // inner 找前一层的
obj.inner 为 inner的内存地址
等于 inner.sayName inner

5. 赋值链
javascript
const obj1 = { x: 1, getX() { return this.x } };
const obj2 = { x: 2 };
obj2.getX = obj1.getX;

const getX = obj2.getX;  // getX 本 -> obj1.getX
直接调用 this-> window
console.log(getX());
undefined

```



```javascript

6. setTimeout中的this
javascript
const obj = {
    value: 'obj',
    logValue() {
        setTimeout(function() {
            console.log(this.value);
        }, 100);
    }
};
obj.logValue(); 
/**
 * function() {
            console.log(this.value);
        }
        直接调用 this -> window undefined
 * */

7. 箭头函数 vs 普通函数
javascript
const obj = {
    value: 'obj',
    regular: function() {
        return () => console.log(this.value);
    },
    arrow: () => {
        return function() {
            console.log(this.value);
        };
    }
};

obj.regular()(); // this -> obj 'obj'
obj.arrow()(); // this -> window undefined

8. call/apply
javascript
function show() {
    console.log(this.name);
}

const obj1 = { name: 'obj1' };
const obj2 = { name: 'obj2' };

show.call(obj1); // 显改变 obj1
show.apply(obj2); // 显改变 obj2
const bound = show.bind(obj1);
bound.call(obj2); // obj1结论先行：一旦函数被 bind 绑定过 this，之后就无法再用 bind / call / apply 改变它的 this 指向了。！！！


9. 构造函数
javascript
function Person(name) {
    this.name = name;
    this.sayName = function() {
        console.log(this.name);
    };
}

const p1 = new Person('Alice');
const say = p1.sayName;
say();
// 隐丢失 undefined

10. 类中的this
javascript
class Counter {
    constructor() {
        this.count = 0;
    }
    
    increment() {
        undefined不能+1 
        this.count++;
        console.log(this.count);
    }
}

const counter = new Counter();
const inc = counter.increment;
inc();


```

```javascript
陷阱题（10题）
11. 数组方法中的this
javascript
const obj = {
    values: [1, 2, 3],
    printValues() {
        this.values.forEach(function(value) {
            console.log(value, this);
        });
    }
};
obj.printValues();
1 window
2 window
3 window

12. 链式调用
javascript
const calculator = {
    value: 0,
    add(num) {
        this.value += num;
        return this;
    },
    multiply(num) {
        this.value *= num;
        return this;
    },
    getValue() {
        return this.value;
    }
};

console.log(calculator.add(5).multiply(2).getValue()); // 10

13. 立即执行函数
javascript
var name = 'global';

const obj = {
    name: 'obj',
    getName: (function() {
        return function() {
            return this.name;
        };
    })()
};

console.log(obj.getName()); 'obj'

14. 属性赋值
javascript
const obj = {
    prop: 'obj',
    method: function() {
        return this.prop;
    }
};

const method = obj.method;
const obj2 = { prop: 'obj2', method };

console.log(obj2.method()); obj2
console.log((obj2.method = obj.method)()); undefined

15. 对象字面量中的箭头函数
javascript
const obj = {
    name: 'obj',
    sayName: () => {
        console.log(this.name);
    }
};

obj.sayName(); undefined



综合难题（5题）
16. 多层嵌套
javascript
const obj = {
    name: 'obj1',
    outer() {
        console.log(this.name);
        return {
            name: 'obj2',
            inner: () => {
                console.log(this.name);
                return {
                    name: 'obj3',
                    deep: function() {
                        console.log(this.name);
                    }
                };
            }
        };
    }
};

obj.outer().inner().deep();
obj1 obj2 obj3

17. new + bind
javascript
function Foo() {
    this.x = 1;
}

const BoundFoo = Foo.bind({ x: 10 });
const obj = new BoundFoo();
console.log(obj.x); // 1 new修改了this的指向 
new > bind 
new > bind 
new > bind 
new > bind 

18. 原型链中的this
javascript
function Animal(name) {
    this.name = name;
}

Animal.prototype.speak = function() {
    console.log(this.name + ' makes a noise');
};

const dog = new Animal('Dog');
const speak = dog.speak; //隐丢失
speak(); undefined make a noise

19. DOM事件
javascript
// 假设有HTML：<button id="btn">Click</button>
const obj = {
    handleClick() {
        console.log(this);
    }
};

document.getElementById('btn').addEventListener('click', obj.handleClick); // button
document.getElementById('btn').addEventListener('click', function() {
    console.log(this); // button 事件处理函数 this指向 元素

});
20. 最坑的一道题
javascript
var length = 10;
function fn() {
    console.log(this.length);
}

const obj = {
    length: 5,
    method: function(fn) {
        fn(); // 10
        arguments[0]();
        // argument.0() 
        // 隐修改 this -> argument 
        // argument 伪数组 长度2
    }
};

obj.method(fn, 1); // 10 2


```