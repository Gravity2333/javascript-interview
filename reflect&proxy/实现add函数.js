/**
 * 分析
 * add 是个对象 并且访问的时候需要能调用一个函数
 * 为什么不能用defineProperty 因为其针对的是属性，而我们事先不知道有什么属性
 * 用Proxy对 对象代理
 *
 * 对象 需要能转换成数字，需要改写Symbol.toPrimitive hint default 返回数字
 */

const add = new Proxy(
  {
    sum: 0,
    [Symbol.toPrimitive]: function (hint) {
      try {
        return this.sum;
      } finally {
        this.sum = 0;
      }
    },
  },
  {
    get(target, propName, receiver) {
      if (typeof propName !== "symbol") {
        Reflect.set(target, "sum", Reflect.get(target, "sum") + +propName);
        return receiver;
      }
      return target[propName].bind(target);
    },
  }
);

const result1 = add[1][2] + 3; //6
console.log(result1);

const result2 = add[3][4][5] + 6; // 18
console.log(result2);
