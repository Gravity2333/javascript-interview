const { default: myScheduler, PriorityLevel } = require("my-sample-scheduler");
myScheduler.scheduleCallback(PriorityLevel.NORMAL_PRIORITY, () => {
  console.log("scheduleCallback run!");
});
