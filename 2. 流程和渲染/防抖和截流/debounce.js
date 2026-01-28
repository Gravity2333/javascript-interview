function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(fn.bind(this,...args), delay);
  };
}


// 2️⃣ 测试函数
function logMessage(msg) {
  console.log(`执行了: ${msg} -- 时间: ${new Date().toLocaleTimeString()}`);
}

// 3️⃣ 用防抖包装测试函数
const debouncedLog = debounce(logMessage, 1000); // 1秒防抖

// 4️⃣ 模拟连续调用
debouncedLog("第一次调用");
debouncedLog("第二次调用");
debouncedLog("第三次调用");

function debounce(fn,delay=300){
  let timer 
  return function(...args){
    clearTimeout(timer)
    timer = setTimeout(fn.bind(this,...args),delay)
  }
}