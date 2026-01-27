class Parent {}
class Son extends Parent {}

console.log(Son.isPrototypeOf(new Son())); // false
console.log(Son.prototype.isPrototypeOf(new Son())); // true

// origin.isPrototypeOf(target). orgin是不是在target的原型上

/** orgin是不是在target的原型上
 * MyIsPrototype
 * @param {*} origin
 * @param {*} target
 */
function MyIsPrototype(origin, target) {
  target = Object.getPrototypeOf(target);

  while (target !== null) {
    if (target === origin) return true;
    target = Object.getPrototypeOf(target);
  }
  return false;
}

console.log(MyIsPrototype(Son, new Son())); // false
console.log(MyIsPrototype(Son.prototype, new Son())); // true
