"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
function PrintClassName(target) {
    console.log("创建了类" + target);
}
function Length(minLen, maxLen) {
    return (target, propName) => {
        console.log(minLen, maxLen);
        Reflect.defineMetadata(target, propName, { minLen, maxLen });
    };
}
function Range(min, max) {
    return (target, propName) => {
        Reflect.defineMetadata(target, propName, { min, max });
    };
}
let Person = class Person {
    name;
    age;
    constructor() { }
};
__decorate([
    Length(3, 32)
], Person.prototype, "name", void 0);
__decorate([
    Range(0, 100)
], Person.prototype, "age", void 0);
Person = __decorate([
    PrintClassName
], Person);
