const divEl = document.createElement("div");
divEl.style.width = "200px";
divEl.style.height = "200px";
divEl.style.background = "red";
divEl.style.position = "fixed";
divEl.style.left = "0";
divEl.style.top = "0";
const body =document.querySelector("body")
body.appendChild(divEl);
const width = body.clientWidth

function moveDiv(highResTimeStamp) {
  divEl.style.left = `${(highResTimeStamp / 10) %width}px`;
  /** 再次放入requestAnimationFrame */
  requestAnimationFrame(moveDiv);
}

requestAnimationFrame(moveDiv);
