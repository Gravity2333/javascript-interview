import "reflect-metadata";

function PrintClassName(target: new (...args: any[]) => any) {
  console.log("创建了类" + target);
}

@PrintClassName
class Person {
  name: string;
  age: number;
  constructor() {}
}


