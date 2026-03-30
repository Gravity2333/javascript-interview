(async function qiankun(window) {
  const code = await fetch("http://localhost:8080/app.js");
  eval(code);
})(createFakeWindow());

function createFakeWindow() {
  const fakeWindow = {};
  const realWindow = window;

  return new Proxy(fakeWindow, {
    get(target, prop) {
      let result;
      if (prop in target) {
        result = target[prop];
      } else {
        return realWindow[prop];
      }

      if (typeof result === "function") {
        return result.bind(realWindow);
      }
      return result;
    },
    set(target, prop, value) {
      target[prop] = value;
      return true;
    },
  });
}
