function runAsync(asyncFn) {
  const context = {
    caches: [],
    pos: 0,
    AsyncException: new Error("runAsync 内部ERR 请抛出"),
    weakable: null,
    fetch: (url) => {
      if (context.caches[context.pos]) {
        if(context.caches[context.pos] instanceof Error){
          throw context.caches[context.pos]
        }
        return context.caches[context.pos++];
      } else {
        context.weakable = new Promise((resolve, reject) => {
          if (context.pos === 2) {
            reject("net err");
          } else {
            setTimeout(() => {
              resolve("DATA FROM MOCK FETCH" + context.pos);
            }, 1000);
          }
        });
        context.weakable;
        context.weakable.then(
          (result) => {
            context.caches[context.pos] = result;
          },
          (error) => {
            context.caches[context.pos] = new Error(error);
          },
        );
        throw context.AsyncException;
      }
    },
  };

  function launch() {
    try {
      context.pos = 0;
      asyncFn(context);
    } catch (err) {
      if (err === context.AsyncException) {
        const weakable = context.weakable;
        context.weakable = null;
        weakable.then(launch,launch);
      } else {
        throw err;
      }
    }
  }

  launch();
}

function asyncFn({ fetch, AsyncException }) {
  try {
    const a = fetch();
    const b = fetch();
    const c = fetch();
    console.log(a, b, c);
  } catch (err) {
    if (err === AsyncException) throw AsyncException;
    console.error("err", err);
  }
}

runAsync(asyncFn);
