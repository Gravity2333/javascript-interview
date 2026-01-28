// 1
// function func(){
//     var a = 10
// }

// func()
// console.log(a) //  a is not defined

/** 很基础 var 的范围在 全局作用域 / 函数作用域内 */

// 2
// for(var i=1;i<10;i++){}

// console.log(i) //10
/** var 会保存在最近的函数/全局词法环境的环境记录器中，不会保存在块词法环境的换记录器中 */
// for(const i=1;i<10;i++){}

// console.log(i) // Err TypeError: Assignment to constant variable.
/**
 * V8是如何执行这个循环的?
 * V8会 创建一个父块词法环境 保存 i
 * 每次循环，都会创建一个子词法环境 把当前的i值，赋给子词法环境的i
 * 子块执行结束后，会把子块i++ 并且反馈给父块的i
 *
 * 所以这里肯定不能用const i
 * 因为const i会让父子的块词法环境都创建 const i const不可修改
 */

// for(let i=1;i<10;i++){}

// console.log(i) // Err ReferenceError: i is not defined

/** 这里报错事因为，for执行结束后，父子的块词法环境都会销毁 此时访问不到i了! */

// if(true){
//     var a = 10
// }
// console.log(a) // 10
/** 块内的var 也会放到最紧的函数/全局词法环境的DER中 所以外面可以访问到 */
// "use strict";
// if (true) {
//   function a() {}
// }
// console.log(a); // 严格模式下: a is not defined 非严格[Function: a]
/**
 * 对于块内的函数声明，类似于let 仅存在块词法环境的DER中！
 * 非严格模式下有个兼容性处理 会将其顺带放到最紧的函数词法环境/全局词法环境的DER中
 */

// let a
// if (true) {
//   function a() {}
// }
// console.log(a); // undefined 外层有let 不会做兼容性处理

// var a
// if (true) {
//   function a() {}
// }
// console.log(a); // Function a var会做兼容性处理

// (function(){
//     var a = b = 10
// })()

// console.log(b) // 10
/** 上述 《=》
 * (function(){
    b = 10
    var a =  b
})()
 */

// console.log(a) // undefined
// if(0){
//     var a = 10
// }
// console.log(a) // undefined

/**
 * 全局的var在预处理阶段 就会被声明
 */

// console.log(a) // undefined
// if(0){
//     function a(){}
// }
// console.log(a) // undefined
/** 块函数正常不会被放到上层，但是在非严格模式下 有兼容性处理 */

// hoisting

// var bar = 1
// function fn(){
//     console.log(bar) // undefined
//     var bar = 2
//     console.log(bar) // 2
// }
// fn()

/** 进入fn 后 先进性预处理
 *  此时，全局的var和全局顶级的function会被提升，var会初始为undefined 函数会被初始为函数对象 函数后赋值，所以函数优先!
 * 这个题 fn进来预处理 bar加入fn 词法环境环境记录器中，赋undefined
 * 执行阶段 console的时候 不会找外层词法环境 undefined
 * 执行过赋值后 bar为2
 */

// function foo() {
//   console.log(a); // Function
//   var a = 10;
//   function a() {}
// }
// foo();

// function foo() {
//   var a = 10;
//   function a() {}
//   console.log(a); // 10
// }
// foo();

/** 提升的过程中
 *  var 先赋 undefined function后赋 所以同名时 函数会覆盖var 即函数优先 所以第一个为function a
 * 然而 函数提升过后，后面就不会再次创建函数对象了，而var一开始初始化为undefined 后面执行到var a=10的时候 还会执行 a=10 会继续覆盖掉函数 所以第二个为 10
 */

// function fn(){
//     var a= 10
//     var a= function(){}

//     console.log(a) // function
// }

// fn()

/** 注意 提升只有函数声明，对于函数表达式 按照var处理
 * 也就是 预处理阶段 a初始化为undefined
 * 后面执行阶段 执行
 * a = 19
 * a =fucntion(){}
 * 最终输出function
 */

// function fn(a){
//     console.log(a)  // 100
//     var a= 10
// }

// function fn(a){
//     console.log(a)  // function a
//     function a(){}
// }

// fn(100)

/** 函数的参数 会在预处理阶段 优先作为一个var 放到函数词法环境中
 * var a 就不会替换了
 * 但是换成function a(){} 就会替换
 */

// function fn(){
//     a = 10
//     var a = 20
//     console.log(a)  // 20
// }

// fn()
// console.log(global.a,a) // a 没有挂到全局

/** 预处理阶段 var a undefined
 *  执行到a=10 a: 10
 *  执行到a=20 a: 20
 *  结果a20
 *
 * 外部global.a 可拿不到a啊
 *
 */

// function fn(){
//     a = 10
//     console.log(a)  // 20
// }

// fn()
// console.log(global.a,a) // 这样才挂到外部啊

/** fn内没有var的时候 或者参数没有a的时候 才会挂全局啊 */
