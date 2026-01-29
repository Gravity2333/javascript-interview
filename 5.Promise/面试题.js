// 1
// const promise = new Promise((resolve, reject) => {
//   console.log(1);

//   setTimeout(() => {
//     console.log(2);
//     resolve();
//     console.log(3);
//   });
// });

// promise.then(() => {
//   console.log(4);
// });

// console.log(5);

// 15234

//2

// const promise1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve();
//   }, 1000);
// });

// const promise2 = promise1.catch(() => {
//   return 2;
// });

// console.log('promise1', promise1);
// console.log('promise2', promise2);

// setTimeout(() => {
//   console.log('promise1', promise1); // promise undefined
//   console.log('promise2', promise2);// promise undefined
// }, 2000);

// const promise1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject();
//   }, 1000);
// });

// const promise2 = promise1.finally(() => {
//   return 2;
// });

// console.log('promise1', promise1);
// console.log('promise2', promise2);

// // 'ERR_UNHANDLED_REJECTION'
// setTimeout(() => {
//   console.log('promise1', promise1);
//   console.log('promise2', promise2);
// }, 2000);

// 注意 finally 不改变任何promise状态

// async function m() {
//   const n = await 1;
//   console.log(n);
// }

// m();
// console.log(2);
// 2 1

// async function m() {
//   console.log(3);
//   const n = await 1;
//   console.log(n);
// }

// m();
// console.log(2);
// 3 2 1


// async function m1() {
//   return 1;
// }

// async function m2() {
//   const n = await m1();
//   console.log(n);
//   return 2;
// }

// async function m3() {
//   // 注意：这里没有使用 await，所以 n 是一个 Promise 对象
//   const n = m2(); 
//   console.log(n);
//   return 3;
// }

// // 第一次调用 m3
// m3().then((n) => {
//   console.log(n);
// });

// // 第二次调用 m3
// m3();

// console.log(4);

/**
 * [[Prototype]]: Promise[[PromiseState]]: "fulfilled"[[PromiseResult]]: 2
VM99:14 Promise {<pending>}[[Prototype]]: Promise[[PromiseState]]: "fulfilled"[[PromiseResult]]: 2
VM99:26 4
VM99:7 1
VM99:20 3
VM99:7 1
 */

// Promise.resolve(1).then(2).then(Promise.resolve(3)).then(console.log) // 1 不是函数的会被忽略


// var a;
// var b = new Promise((resolve, reject) => {
//   console.log('promise1');
//   setTimeout(() => {
//     resolve();
//   }, 1000);
// })
//   .then(() => {
//     console.log('promise2');
//   })
//   .then(() => {
//     console.log('promise3');
//   })
//   .then(() => {
//     console.log('promise4');
//   });

// a = new Promise(async (resolve, reject) => {
//   console.log(a);
//   await b;
//   console.log(a);
//   console.log('after1');
//   await a;
//   resolve(true);
//   console.log('after2');
// });

// console.log('end');

// 什么几把题
// promise1
// undefined
// end
// promise2
// promise3
// promise4
// Promise 

// a = new  Promise(async(resolve,reject)=>{
//     await 1
//     await a
//     resolve("never arr")
// })

// console.log("end")


async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2');
}

console.log('script start');

setTimeout(function () {
  console.log('setTimeout');
}, 0);

async1();

new Promise(function (resolve) {
  console.log('promise1');
  resolve();
}).then(function () {
  console.log('promise2');
});

console.log('script end');

// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout