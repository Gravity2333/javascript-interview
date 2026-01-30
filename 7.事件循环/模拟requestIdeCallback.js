const divEl = document.createElement("div");
divEl.style.width = "200px";
divEl.style.height = "200px";
divEl.style.background = "red";
divEl.style.position = "fixed";
divEl.style.left = "0";
divEl.style.top = "0";
const body = document.querySelector("body");
body.appendChild(divEl);
const width = body.clientWidth;

function moveDiv(highResTimeStamp) {
  divEl.style.left = `${(highResTimeStamp / 10) % width}px`;
  /** 再次放入requestAnimationFrame */
  requestAnimationFrame(moveDiv);
}

requestAnimationFrame(moveDiv);

window.requestIdleCallback = (cb, option) => {
  const messageChannel = new MessageChannel();
  messageChannel.port2.onmessage = (r) => {
    const { frameStart } = r.data
    const frameEnd = frameStart + 16.7;
    const timeRemaining = () => frameEnd - performance.now() ;
    const deadline = {
      timeRemaining,
      didTimeout: !!(
        option.timeout && performance.now() - frameStart > option.timeout
      ),
    };
    cb(deadline);
  };

  requestAnimationFrame((highResTimestamp) => {
    const frameStart = highResTimestamp;
    messageChannel.port1.postMessage({
      frameStart,
    });
  });
};

const hugeData = [];
function slowCount(deadline) {
  console.log(
    `任务开始 当前剩下${deadline.timeRemaining()}ms`,
    "hugeData.len = " + hugeData.length,
  );
  while (
    hugeData.length <= 10000 &&
    (deadline.didTimeout || deadline.timeRemaining() > 0)
  ) {
    const section = [];
    for (let i = 1; i < 1000000; i++) {
      section.push(i);
    }
    hugeData.push(section);
    console.log("hugeData.len = " + hugeData.length);
  }

  if (hugeData.length <= 10000) {
    requestIdleCallback(slowCount, { timeout: 1000 });
  } else {
    console.log("task end", hugeData);
  }
}
requestIdleCallback(slowCount, { timeout: 1000 });
