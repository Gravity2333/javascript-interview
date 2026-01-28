function deepClone(target, cache = new WeakMap()) {
  // filter func primitive null
  if (target === null || typeof target !== "object") {
    return target;
  }

  // 走缓存 防止循环依赖
  if (cache.has(target)) {
    return cache.get(target);
  }

  // date
  if (target instanceof Date) {
    const res = new Date(target);
    cache.set(target, res);
    return res;
  }

  // regexp
  if (target instanceof RegExp) {
    const res = new RegExp(target);
    cache.set(target, res);
    return res;
  }

  // Map
  if (target instanceof Map) {
    const map = new Map(target);
    cache.set(target, map);
    target.forEach((k, v) => {
      map.set(deepClone(k,cache), deepClone(v,cache));
    });
    return map;
  }

  // Set
  if (target instanceof Set) {
    const set = new Set(target);
    cache.set(target, set);
    target.forEach((v) => {
      set.add(deepClone(v,cache));
    });
    return set;
  }

  // 处理 array 普通 obj
  const res = Array.isArray(target)
    ? []
    : Object.create(Object.getPrototypeOf(target));
  cache.set(target, res);

  Reflect.ownKeys(target).forEach((k) => {
    res[k] = deepClone(target[k],cache);
  });

  return res;
}

function runDeepCloneTests(deepClone) {
  console.log("==== DeepClone Test Start ====");

  // 1. 基础类型
  (() => {
    const obj = { a: 1, b: "str", c: true, d: null, e: undefined };
    const clone = deepClone(obj);

    console.assert(clone !== obj, "Test1: 引用应不同");
  })();

  // 2. 嵌套对象 & 数组
  (() => {
    const obj = { arr: [1, { x: 10 }] };
    const clone = deepClone(obj);

    clone.arr[1].x = 99;
    console.assert(obj.arr[1].x === 10, "Test2: 深拷贝失败");
  })();

  // 3. Date / RegExp
  (() => {
    const obj = {
      date: new Date("2025-01-01"),
      reg: /hello/gi,
    };
    const clone = deepClone(obj);

    console.assert(+clone.date === +obj.date, "Test3: Date 失败");
    console.assert(
      clone.reg.source === obj.reg.source && clone.reg.flags === obj.reg.flags,
      "Test3: RegExp 失败",
    );
  })();

  // 4. Map / Set
  (() => {
    const obj = {
      map: new Map([[{ k: 1 }, "v"]]),
      set: new Set([1, 2, 3]),
    };
    const clone = deepClone(obj);

    console.assert(clone.map !== obj.map, "Test4: Map 引用未断开");
    console.assert(clone.set.size === 3, "Test4: Set 失败");
  })();

  // 5. Symbol key
  (() => {
    const sym = Symbol("id");
    const obj = { [sym]: "symbol value" };
    const clone = deepClone(obj);

    console.assert(clone[sym] === "symbol value", "Test5: Symbol key 丢失");
  })();

  // 6. 循环引用
  (() => {
    const obj = { name: "loop" };
    obj.self = obj;
    const clone = deepClone(obj);

    console.assert(clone.self === clone, "Test6: 循环引用失败");
  })();

  // 7. 原型链
  (() => {
    function Person(name) {
      this.name = name;
    }
    Person.prototype.say = function () {
      return this.name;
    };

    const obj = new Person("Alice");
    const clone = deepClone(obj);

    console.assert(clone instanceof Person, "Test7: 原型链丢失");
    console.assert(clone.say() === "Alice", "Test7: 方法失效");
  })();

  console.log("✅ All DeepClone Tests Passed!");
}

runDeepCloneTests(deepClone);
