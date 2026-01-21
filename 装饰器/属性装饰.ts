import "reflect-metadata";

function PrintClassName(target: new (...args: any[]) => any) {
  console.log("创建了类" + target);
}

function Length(minLen: number, maxLen: number) {
  return (target: any, propName: string) => {
     console.log(minLen,maxLen);
    Reflect.defineMetadata(target, propName, { minLen, maxLen });
  };
}

function Range(min: number, max: number) {
  return (target: any, propName: string) => {
    Reflect.defineMetadata(target, propName, { min, max });
  };
}

@PrintClassName
class Person {
  @Length(3, 32)
  name: string;
  @Range(0, 100)
  age: number;
  constructor() {}
}


// const p = new Person()