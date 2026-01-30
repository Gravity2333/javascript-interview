### node 事件循环 包含三个队列
1. timer 队列 用来处理比如setTimeout setInterval这样的计时器回调
2. poll 队列 用来处理 文件IO 回调
[poll 即 民意调查 轮巡检查的意思 “我在这儿等，有事你就把我叫醒”]
3. check队列 用来处理setImmediate回调

事件循环不会空转，每次循环都会 
检查并且清空timer队列 -> 检查并且清空poll队列，此时 如果check和timer都没有任务 就在poll队列等待，这样的设计是为了优先处理IO事件\
当check/timer队列有任务时，事件循环会唤醒 并且去执行 check队列 此时 一次循环(tick)结束 
开始下一轮循环，检查timer队列 poll对列并且停留

当等待在poll的时候 同时来了timer和check 会先执行check check之后行 开启下一轮循环的时候 才执行timer

### nexttick & 维任务
nexttick的含义是 在下一轮循环之前执行 执行时机在 每个任务被执行完成后，会检查并且清空nexttick队列
nexttick队列的优先级最高 甚至比微任务队列高

微任务队列，可以使用Promise.resolve().then(cb)的方式加入微任务队列，其优先级在nexttick之后，也是每个宏任务执行后，执行

每个宏任务执行后 先nexttick队列 后 微任务队列