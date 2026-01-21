function Emit(msg: string) {
  console.log("创建: " + msg);
  return (target: any, ...args: any[]) => {
    console.log("执行: " + msg);
  };
}

@Emit("Animal 类装饰器")
class Animal {
  @Emit("Animal type1 装饰器 - 1")
  @Emit("Animal type1 装饰器 - 2")
  type1: string = "animal";

  @Emit("Animal type2 装饰器 - 1")
  @Emit("Animal type2 装饰器 - 2")
  type2: string = "animal";

  @Emit("Animal static  type1 装饰器")
  static type1: string = "animal";

  @Emit("Animal static  type2 装饰器")
  static type2: string = "animal";

  constructor(@Emit("Animal ctor 参数装饰器") a: number = 10) {}

  @Emit("Animal eat1 装饰器")
  eat1(
    @Emit("Animal eat1 参数1装饰器") a: number = 10,
    @Emit("Animal eat1 参数2装饰器") b: number = 10
  ) {}

  @Emit("Animal eat2 装饰器")
  eat2(
    @Emit("Animal eat2 参数1装饰器") a: number = 10,
    @Emit("Animal eat2 参数2装饰器") b: number = 10
  ) {}
}
