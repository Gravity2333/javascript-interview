function runGenerator(generator) {
  function handleThen(result) {
    if (result.done) return result.value;
    return Promise.resolve(result.value).then(handleThen);
  }

  return generator().next(handleThen);
}
