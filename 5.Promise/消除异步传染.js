function runAsync(asyncFn) {
  const context = {
    caches: [],
    pos: 0,
    fetch: (url) => {
      if (context.caches[context.pos]) {
        return context.caches[context.pos++];
      } else {
        const weakable = new Promise((resolve) => {
          setTimeout(() => {
            resolve("DATA FROM MOCK FETCH" + context.pos);
          }, 1000);
        });
        weakable.then((result) => {
          context.caches[context.pos] = result;
        });
        throw weakable;
      }
    },
  };

  function launch() {
    try {
      context.pos = 0;
      asyncFn(context);
    } catch (err) {
      if (err instanceof Promise) {
        err.then(launch);
      }
    }
  }

  launch();
}

function asyncFn({ fetch }) {
  const a = fetch();
  const b = fetch();
  const c = fetch();
  console.log(a,b,c);
}

runAsync(asyncFn);
