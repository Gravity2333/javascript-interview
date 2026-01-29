/**
 * 支持不同环境下的 queueMicrotask
 * @param {*} cb
 */
function _queueMicrotask(cb) {
  if (typeof window !== "undefined" && window.queueMicrotask) {
    window.queueMicrotask(cb);
  } else {
    process.nextTick(cb);
  }
}

/**
 * duck test看是否为thenable
 * @param {*} mayBeThenable
 */
function isThenable(mayBeThenable) {
  return (
    mayBeThenable &&
    mayBeThenable !== null &&
    (typeof mayBeThenable === "object" ||
      typeof mayBeThenable === "function") &&
    typeof mayBeThenable.then === "function"
  );
}

/** 自己实现Promise */
function MyPromise(executor) {
  /**
   * 为什么需要这两个数组，当Promise还在pending的时候 需要把then挂上的回调存储下来，等决策之后 遍历运行
   * 当promise已经决策，此时再then 就直接放到微任务中执行了
   */
  /** fulfilled的回调 */
  this.onFulfilledCallback = [];
  /** rejected的回调 */
  this.onRejectedCallback = [];

  /** state */
  this.state = "pending";

  /** 成功 */
  this.value;
  this.reason;

  /**
   * 负责处理resolve
   * @param {*} value
   */
  function handleResolve(_value) {
    // 只有pending 才能设置状态
    if (this.isPending()) {
      MyPromise._handleThenable(
        _value,
        (_v) => {
          if (this.isPending()) {
            this.state = "fulfilled";
            this.value = _v;

            // 执行成功的callback
            this.onFulfilledCallback.forEach((cb) => cb());
          }
        },
        handleRejected.bind(this),
      );
    }
  }

  /**
   * 负责处理错误
   * @param {*} reason
   */
  function handleRejected(_reason) {
    // 只有pending 才能设置状态
    if (this.isPending()) {
      this.state = "rejected";
      this.reason = _reason;
      // 执行失败的callback
      this.onRejectedCallback.forEach((cb) => cb());
    }
  }

  try {
    executor(handleResolve.bind(this), handleRejected.bind(this));
  } catch (err) {
    // 抛出异常 调用handleRejected
    handleRejected.call(this, err);
  }
}

/** 设置原型 */
/** 是否还在pending */
MyPromise.prototype.isPending = function () {
  return this.state === "pending";
};
/**
 * then
 */
MyPromise.prototype.then = function (
  onFulfilled = (val) => val,
  onRejected = (reason) => {
    throw reason;
  },
) {
  /** 传入的是普通值的情况 */
  if (typeof onFulfilled !== "function") onFulfilled = (val) => val;
  if (typeof onRejected !== "function") onRejected = (val) => val;
  const self = this;
  return new MyPromise((resolve, reject) => {
    const runThenCallback = () => {
      try {
        const maybeThenable =
          this.state === "fulfilled"
            ? onFulfilled(this.value)
            : onRejected(this.reason);
        if (maybeThenable === self)
          throw new Error("then 方法不能返回本Promise");
        return MyPromise._handleThenable(maybeThenable, resolve, reject);
      } catch (err) {
        reject(err);
      }
    };

    /** 如果已经决策 直接加入微任务队列 */
    if (!this.isPending()) {
      _queueMicrotask(runThenCallback);
    } else {
      this.onFulfilledCallback.push(
        _queueMicrotask.bind(this, runThenCallback),
      );
      this.onRejectedCallback.push(_queueMicrotask.bind(this, runThenCallback));
    }
  });
};

/**
 *catch
 * @param {*} cb
 */
MyPromise.prototype.catch = function (cb) {
  return this.then((val) => val, cb);
};

/**
 * finally
 * @param {*} cb
 * @returns
 */
MyPromise.prototype.finally = function (cb) {
  return this.then(
    (val) => {
      cb();
      return MyPromise.resolve(val);
    },
    (reason) => {
      cb();
      return MyPromise.reject(reason);
    },
  );
};

/** 设置静态方法 */
MyPromise._handleThenable = function (maybeThenable, resolve, reject) {
  if (isThenable(maybeThenable)) {
    maybeThenable.then(resolve, reject);
  } else {
    resolve(maybeThenable);
  }
};

MyPromise.resolve = function (maybeThenable) {
  return new MyPromise((resolve, reject) => {
    MyPromise._handleThenable(maybeThenable, resolve, reject);
  });
};

MyPromise.reject = function (reason) {
  return new MyPromise((resolve, reject) => {
    reject(reason);
  });
};

/** MyPromise.all
 * 所有的都成功 -> fulfilled 返回Promise.all 返回：所有 Promise 完成后的值数组 不是Promise数组
 * 任何一个失败 返回这个失败原因
 * */
MyPromise.all = function (myPromises) {
  return new MyPromise((resolve, reject) => {
    let fulfilled = 0;
    const results = [];
    for (let i = 0; i < myPromises.length; i++) {
      const myPromise = myPromises[i];
      MyPromise.resolve(myPromise)
        .then((val) => {
          fulfilled++;
          results[i] = val;
          if (fulfilled === myPromises.length) {
            resolve(results);
          }
        })
        .catch((reason) => {
          reject(reason);
        });
    }
  });
};

/** MyPromise.race
 * 第一个完成的（无论成功或失败）→ 整个 race 就结束 并且返回这个promise
 */
MyPromise.race = function (myPromises) {
  return new MyPromise((resolve, reject) => {
    for (const myPromise of myPromises) {
      MyPromise.resolve(myPromise).then(resolve, reject);
    }
  });
};

/** allSettled 永远不会失败 当所有的都决策之后 返回一个这样的格式
 * [
 *  {status: 'fulfilled',value: xx},
 *  {status: 'rejected',reason: xxx}
 * ]
 *
 */
MyPromise.allSettled = function (myPromises) {
  let settled = 0;
  const results = [];
  return new MyPromise((resolve) => {
    for (let i = 0; i < myPromises.length; i++) {
      const myPromise = myPromises[i];
      MyPromise.resolve(myPromise)
        .then(
          (value) => {
            settled++;
            results[i] = {
              status: "fulfilled",
              value,
            };
          },
          (reason) => {
            settled++;
            results[i] = {
              status: "rejected",
              reason,
            };
          },
        )
        .finally(() => {
          if (settled === myPromises.length) {
            resolve(results);
          }
        });
    }
  });
};

/** 测试函数 */
function testMyPromiseAdvanced(MyPromise) {
  console.log("=== MyPromise Advanced Test Start ===");

  // helper
  const log = (name, pass) => console.log(name.padEnd(35), pass ? "✅" : "❌");

  /* --------------------------------
   * 1️⃣ thenable 吸收（对象）
   * -------------------------------- */
  const thenableObj = {
    then(resolve) {
      setTimeout(() => resolve(42), 10);
    },
  };

  new MyPromise((resolve) => resolve(thenableObj)).then((v) =>
    log("[thenable object resolve]", v === 42),
  );

  /* --------------------------------
   * 2️⃣ thenable 吸收（函数）
   * -------------------------------- */
  function ThenableFn() {}
  ThenableFn.then = function (resolve) {
    resolve(100);
  };

  new MyPromise((resolve) => resolve(ThenableFn)).then((v) =>
    log("[thenable function resolve]", v === 100),
  );

  /* --------------------------------
   * 3️⃣ thenable 只允许调用一次
   * -------------------------------- */
  const badThenable = {
    then(resolve, reject) {
      resolve(1);
      resolve(2);
      reject(3);
    },
  };

  new MyPromise((resolve) => resolve(badThenable)).then((v) =>
    log("[thenable once]", v === 1),
  );

  /* --------------------------------
   * 4️⃣ thenable then 抛异常
   * -------------------------------- */
  const throwThenable = {
    then() {
      throw "then error";
    },
  };

  new MyPromise((resolve) => resolve(throwThenable)).catch((e) =>
    log("[thenable throw]", e === "then error"),
  );

  /* --------------------------------
   * 5️⃣ then 链异常冒泡
   * -------------------------------- */
  new MyPromise((resolve) => resolve(1))
    .then(() => {
      throw "chain error";
    })
    .then(
      () => log("[chain throw skip]", false),
      (e) => log("[chain throw bubble]", e === "chain error"),
    );

  /* --------------------------------
   * 6️⃣ catch 等价 then(null, onRejected)
   * -------------------------------- */
  new MyPromise((_, reject) => reject("x"))
    .catch((e) => e + "y")
    .then((v) => log("[catch chain]", v === "xy"));

  /* --------------------------------
   * 7️⃣ finally 不改变值
   * -------------------------------- */
  if (typeof MyPromise.prototype.finally === "function") {
    new MyPromise((resolve) => resolve(10))
      .finally(() => {})
      .then((v) => log("[finally pass value]", v === 10));

    new MyPromise((_, reject) => reject(20))
      .finally(() => {})
      .catch((e) => log("[finally pass error]", e === 20));
  }

  /* --------------------------------
   * 8️⃣ then 回调必须异步
   * -------------------------------- */
  let asyncOrder = [];

  new MyPromise((resolve) => resolve()).then(() => asyncOrder.push("then"));

  asyncOrder.push("sync");

  setTimeout(() => {
    log("[then async]", asyncOrder.join(",") === "sync,then");
  }, 0);

  /* --------------------------------
   * 9️⃣ 多次 then 订阅同一个 promise
   * -------------------------------- */
  const p = new MyPromise((resolve) => resolve(5));

  let sum = 0;
  p.then((v) => (sum += v));
  p.then((v) => (sum += v));

  setTimeout(() => {
    log("[multi then]", sum === 10);
  }, 0);

  /* --------------------------------
   * 🔟 then 返回自身（循环引用）
   * -------------------------------- */
  let p2;
  const p1 = new MyPromise((resolve) => resolve(1));
  p2 = p1.then(() => p2);

  p2.catch((e) => log("[cycle reject]", e instanceof TypeError));

  /* --------------------------------
   * 11️⃣ resolve / reject 只能生效一次
   * -------------------------------- */
  new MyPromise((resolve, reject) => {
    resolve(1);
    reject(2);
    resolve(3);
  }).then((v) => log("[resolve once]", v === 1));

  /* --------------------------------
   * 12️⃣ executor 异步 throw
   * -------------------------------- */
  //   try {
  //     new MyPromise((resolve) => {
  //       setTimeout(() => {
  //         throw "async boom";
  //       });
  //     }).catch(() => log("[async throw ignored]", true));

  //     setTimeout(() => {
  //       console.log("=== MyPromise Advanced Test End ===");
  //     }, 50);
  //   } catch (e) {}

  /* --------------------------------
   * 13️⃣ Promise.all
   * -------------------------------- */
  if (typeof MyPromise.all === "function") {
    MyPromise.all([
      new MyPromise((r) => setTimeout(() => r(1), 10)),
      new MyPromise((r) => r(2)),
      3,
    ]).then((res) =>
      log(
        "[Promise.all resolve]",
        Array.isArray(res) && res.join(",") === "1,2,3",
      ),
    );

    MyPromise.all([
      new MyPromise((r) => r(1)),
      new MyPromise((_, rej) => rej("err")),
      new MyPromise((r) => r(3)),
    ]).catch((e) => log("[Promise.all reject]", e === "err"));
  }

  /* --------------------------------
   * 14️⃣ Promise.race
   * -------------------------------- */
  if (typeof MyPromise.race === "function") {
    MyPromise.race([
      new MyPromise((r) => setTimeout(() => r(1), 20)),
      new MyPromise((r) => setTimeout(() => r(2), 5)),
    ]).then((v) => log("[Promise.race resolve]", v === 2));

    MyPromise.race([
      new MyPromise((_, rej) => setTimeout(() => rej("err"), 5)),
      new MyPromise((r) => setTimeout(() => r(1), 20)),
    ]).catch((e) => log("[Promise.race reject]", e === "err"));
  }

  /* --------------------------------
   * 15️⃣ Promise.allSettled
   * -------------------------------- */
  if (typeof MyPromise.allSettled === "function") {
    MyPromise.allSettled([
      new MyPromise((r) => r(1)),
      new MyPromise((_, rej) => rej("err")),
      3,
    ]).then((res) => {
      const pass =
        res.length === 3 &&
        res[0].status === "fulfilled" &&
        res[0].value === 1 &&
        res[1].status === "rejected" &&
        res[1].reason === "err" &&
        res[2].status === "fulfilled" &&
        res[2].value === 3;

      log("[Promise.allSettled]", pass);
    });
  }

  /* -------------------------------- */
  setTimeout(() => {
    console.log("=== MyPromise Advanced Test End ===");
  }, 100);
}

testMyPromiseAdvanced(MyPromise);
// MyPromise.resolve(1).then(2).then(Promise.resolve(3)).then(console.log)