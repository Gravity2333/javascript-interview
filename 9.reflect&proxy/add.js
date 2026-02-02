// add[1][2] + 3 // 6
// add[3][4][5] + 6 // 18

const add = new Proxy(
  {
    total: 0,
  },
  {
    get(target, key, receiver) {
      if (key === Symbol.toPrimitive) {
        return (hint) => {
          try {
            return Reflect.get(target, "total", receiver);
          } finally {
            Reflect.set(target, "total", 0, receiver);
          }
        };
      }
      Reflect.set(
        target,
        "total",
        +Reflect.get(target, "total", receiver) + +key,
        receiver,
      );
      return add;
    },

    set() {},
  },
);
