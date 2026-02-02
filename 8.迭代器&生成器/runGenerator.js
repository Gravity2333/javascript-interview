function runGenerator(generator) {
  const iterator = generator();

  function handleNext({ value, done } = {}) {
    if (done) {
      return value;
    }
    if (value instanceof Promise) {
      return Promise.resolve(
        value
          .then((_val) => {
            return handleNext(iterator.next(_val));
          })
          .catch((err) => {
            iterator.throw(err);
          })
      );
    } else {
      return handleNext(iterator.next(value));
    }
  }

  return Promise.resolve(iterator.next()).then(handleNext);
}

function* task() {
  console.log(yield 1);
  try {
    console.log(
      yield new Promise((resolve, reject) => {
        setTimeout(() => reject("404"), 1000);
      })
    );
  } catch (err) {
    console.log("request err:" + err);
  }

  console.log(yield 3);
}

// runGenerator(task);


setImmediate(() => {
  console.log('timeout start');

  process.nextTick(() => {
    console.log('nextTick');
  });

  console.log('timeout end');
});

setImmediate(()=>{
  console.log(2)
})