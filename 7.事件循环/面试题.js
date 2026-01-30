// Promise.resolve().then(() => {
//   setTimeout(() => console.log(1));
// });
// setTimeout(() => console.log(2));
// 2 -> 1

// console.log('1');

// setTimeout(() => {
//   console.log('2');
// }, 0);

// Promise.resolve().then(() => {
//   console.log('3');
// });

// console.log('4');
// 1 4 3 2

// Promise.resolve()
//   .then(() => {
//     console.log('promise1');
//     return Promise.resolve();
//   })
//   .then(() => {
//     console.log('promise2');
//   });

// setTimeout(() => {
//   console.log('timeout');
// }, 0);

// console.log('script end');

// script end
// promise 1
// promise 2
// timeout

// console.log('start');

// setTimeout(() => {
//   console.log('timeout1');
// }, 0);

// Promise.resolve().then(() => {
//   console.log('promise1');
//   setTimeout(() => {
//     console.log('timeout2');
//   }, 0);
// });

// console.log('end');

// start
// end
// promise1
// timeout1
// timeout2

// Promise.resolve().then(() => {
//   console.log('promise1-1');
//   Promise.resolve().then(() => {
//     console.log('promise2-1');
//   }).then(() => {
//     console.log('promise2-2');
//   });
// }).then(() => {
//   console.log('promise1-2');
// });

// promise1-1
// promise2-1
// promise1-2
// promise2-2

// async function async1() {
//   console.log('async1 start');
//   await async2();
//   console.log('async1 end');
// }

// async function async2() {
//   console.log('async2');
// }

// console.log('script start');

// setTimeout(() => {
//   console.log('setTimeout');
// }, 0);

// async1();

// new Promise(resolve => {
//   console.log('promise1');
//   resolve();
// }).then(() => {
//   console.log('promise2');
// });

// console.log('script end');

// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout

// Promise.resolve()
//   .then(() => {
//     console.log('1');
//     throw new Error('error');
//   })
//   .catch(() => {
//     console.log('2');
//   })
//   .then(() => {
//     console.log('3');
//   });

// setTimeout(() => {
//   console.log('4');
// }, 0);

// 1
// 2
// 3
// 4

// setTimeout(() => console.log('timeout1'), 0);

// Promise.resolve()
//   .then(() => {
//     console.log('promise1');
//     setTimeout(() => {
//       console.log('timeout2');
//       Promise.resolve().then(() => console.log('promise3'));
//     }, 0);
//     return Promise.resolve();
//   })
//   .then(() => {
//     console.log('promise2');
//   });

// queueMicrotask(() => {
//   console.log('queueMicrotask1');
// });

// console.log('global');

// global
// promise1
// queueMicrotask1
// promise2
// timeout1
// timeout2
// promise3

// 问：点击按钮后的完整输出顺序？
// button.addEventListener('click', () => {
//   Promise.resolve().then(() => console.log('Microtask 1'));
//   console.log('Listener 1');

//   setTimeout(() => console.log('Timeout 1'), 0);

//   Promise.resolve().then(() => {
//     console.log('Microtask 2');
//     setTimeout(() => console.log('Timeout 2'), 0);
//   });

//   console.log('Listener 2');
// });

// 'Listener 1'
// 'Listener 2'
// 'Microtask 1'
// 'Microtask 2'
// Timeout 1
// Timeout 2

// console.log('start');

// setTimeout(() => console.log('timeout'), 0);

// Promise.resolve().then(() => console.log('promise'));

// requestAnimationFrame(() => console.log('raf'));

// console.log('end');

// start
// end
// promise
// raf
// timeout

// 重点 用户点击 和 代码触发
document.body.addEventListener("click", () => {
  Promise.resolve().then(() => console.log("Microtask"));
  console.log("Listener");
});

document.body.click(); // 手动触发点击
console.log("Global");

/** 重要 当使用js模拟点击的时候 会同步执行cb 而不是放到宏任务队列 在自动化测试的时候 需要注意! */

// listener
// global
// microrask

class Component extends React.Component {
  state = { count: 0 };

  handleClick = () => {
    this.setState({ count: this.state.count + 1 });
    console.log("sync:", this.state.count); // 0

    this.setState({ count: this.state.count + 1 });
    console.log("sync:", this.state.count); // 0

    setTimeout(() => {
      this.setState({ count: this.state.count + 1 });
      console.log("timeout:", this.state.count); // 2
    }, 0);

    Promise.resolve().then(() => {
      console.log("promise:", this.state.count); // 2
    });
  };

  render() {
    console.log("render:", this.state.count); // 2（合并更新后）
    return <button onClick={this.handleClick}>Click</button>;
  }
}
function Component() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    console.log("sync:", count);

    setCount(count + 1);
    console.log("sync:", count);

    setTimeout(() => {
      setCount(count + 1);
      console.log("timeout:", count);
    }, 0);

    Promise.resolve().then(() => {
      console.log("promise:", count);
    });
  };

  console.log("render:", count);
  return <button onClick={handleClick}>Click</button>;
}

// render 0
// sync 0
// sync 0
// render 1
// promise 0
// render 1
// timeout 0
