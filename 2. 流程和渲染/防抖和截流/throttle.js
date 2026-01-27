function throttle(fn, delay = 300) {
  let timer;
  return (...args) => {
    if (timer) return
    timer = setTimeout(()=>{
      fn.call(this,...args)
      timer = null
    }, delay);
  };
}


function logMessage(msg) {
  console.log(`执行了: ${msg} -- 时间: ${new Date().toLocaleTimeString()}`);
}

const throttledLog = throttle(logMessage, 1000); // 1秒节流

let count = 1;
const interval = setInterval(() => {
  throttledLog(`调用 ${count}`);
  count++;
  if (count > 5) clearInterval(interval);
}, 300); // 每 300ms 调用一次
