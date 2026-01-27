class Parent {}
class Son extends Parent {}

// console.log(new Son() instanceof Son);
// console.log(new Son() instanceof Parent);
// console.log({} instanceof Object);
// console.log(function () {} instanceof Function);
// console.log(new Son() instanceof ctor)

/**
 * MyInstanceOf 判断 ctor.prototype是不是在origin的原型链上
 * @param {*} origin
 * @param {*} ctor  必须是构造函数 而且 prototype必须是对象
 * @returns
 */
function MyInstanceOf(origin, ctor) {
  if (
    typeof ctor !== "function" ||
    !(
      typeof ctor.prototype === "object" || typeof ctor.prototype === "function"
    )
  ) {
    throw new Error("ctor必须是构造函数 而且其prototype必须是对象");
  }
  origin = Object.getPrototypeOf(origin);
  while (origin !== null) {
    if (origin.constructor === ctor) return true;
    origin = Object.getPrototypeOf(origin);
  }
  return false;
}

console.log(MyInstanceOf(new Son(), Son));
console.log(MyInstanceOf(new Son(), Parent));
console.log(MyInstanceOf(new Son(), Object));
console.log(MyInstanceOf(new Son(), Function));
