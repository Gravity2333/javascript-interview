declare function Emit(msg: string): (target: any, ...args: any[]) => void;
declare class Animal {
    type1: string;
    type2: string;
    static type1: string;
    static type2: string;
    constructor(a?: number);
    eat1(a?: number, b?: number): void;
    eat2(a?: number, b?: number): void;
}
