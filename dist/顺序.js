"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function Emit(msg) {
    console.log("创建: " + msg);
    return (target, ...args) => {
        console.log("执行: " + msg);
    };
}
let Animal = class Animal {
    type1 = "animal";
    type2 = "animal";
    static type1 = "animal";
    static type2 = "animal";
    constructor(a = 10) { }
    eat1(a = 10, b = 10) { }
    eat2(a = 10, b = 10) { }
};
__decorate([
    Emit("Animal type1 装饰器 - 1"),
    Emit("Animal type1 装饰器 - 2")
], Animal.prototype, "type1", void 0);
__decorate([
    Emit("Animal type2 装饰器 - 1"),
    Emit("Animal type2 装饰器 - 2")
], Animal.prototype, "type2", void 0);
__decorate([
    Emit("Animal eat1 装饰器"),
    __param(0, Emit("Animal eat1 参数1装饰器")),
    __param(1, Emit("Animal eat1 参数2装饰器"))
], Animal.prototype, "eat1", null);
__decorate([
    Emit("Animal eat2 装饰器"),
    __param(0, Emit("Animal eat2 参数1装饰器")),
    __param(1, Emit("Animal eat2 参数2装饰器"))
], Animal.prototype, "eat2", null);
__decorate([
    Emit("Animal static  type1 装饰器")
], Animal, "type1", void 0);
__decorate([
    Emit("Animal static  type2 装饰器")
], Animal, "type2", void 0);
Animal = __decorate([
    Emit("Animal 类装饰器"),
    __param(0, Emit("Animal ctor 参数装饰器"))
], Animal);
