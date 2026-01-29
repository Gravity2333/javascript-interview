function runAsyncFunction(generatorFn, ...args) {
  const iterator = generatorFn(...args);

  function handleNext(nextInput) {
    if (nextInput.done) {
      return nextInput.value;
    }
    return Promise.resolve(nextInput.value)
      .then(iterator.next.bind(iterator))
      .then(handleNext)
      .catch(iterator.throw.bind(iterator));
  }

  return Promise.resolve(iterator.next()).then(handleNext);
}

function* asyncFn() {
  try {
    let a = yield 1;
    console.log(a);
    let b = yield new Promise((r, rj) =>
      setTimeout(() => {
        rj("err form promise");
      }, 1000),
    );
    console.log(b);
    let c = yield 2000;
    console.log(c);
  } catch (err) {
    console.error(err);
  }
}

runAsyncFunction(asyncFn);
