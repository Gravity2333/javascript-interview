/** Proxy实现 Observe */

/** 惰性代理 */
function Observe(origin) {
  return new Proxy(origin, {
    get(target, propName, receiver) {
      const targetValue = Reflect.get(target, propName, receiver);
      console.log("get", targetValue);
      if (targetValue && typeof targetValue === "object") {
        return Observe(targetValue);
      }
      return targetValue;
    },
    set(target, propName, value, receiver) {
      console.log("set", target, propName, value);
      Reflect.set(target, propName, value, receiver);
    },
  });
}

const origin = {
  a: 100,
  b: 200,
  c: {
    d: 100,
  },
};
const observed = Observe(origin);
// observed.a=111
// observed.a
observed.info = {
  name: "bill",
  age: 18,
};
observed.info.age;
