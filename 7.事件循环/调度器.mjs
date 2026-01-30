import myScheduler, { PriorityLevel } from "my-sample-scheduler";

myScheduler.scheduleCallback(PriorityLevel.NORMAL_PRIORITY, () => {
  console.log("scheduleCallback run!");
});
