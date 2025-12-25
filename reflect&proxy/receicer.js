const oigin = {
  _name: "parent",
  get name() {
    console.log(this._name);
  },
};

const parent = new Proxy(oigin, {
  get: (target, propName, receiver) => {
    console.log("receiver", receiver === child);  // true
    return Reflect.get(target,propName,receiver)
  },
});

const child = Object.create(parent);
child._name = "child";

child.name; 
