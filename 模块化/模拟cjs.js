(function (modules, entryPath) {
  const cache = {};

  function require(modulePath) {
    if (cache[modulePath]) return cache[modulePath];
    const _module = modules[modulePath]?.code;
    if (!_module) {
      throw new Error(`模块: ${modulePath} 未找到`);
    }
    const module = {
      exports: {},
    };
    const _run = new Function(
      "exports",
      "require",
      "module",
      "__pathname",
      _module
    );
    _run.call(module.exports, module.exports,require, module, modulePath);
    // 存入缓存
    cache[modulePath] = module;
    return module.exports;
  }

  if (entryPath) {
    require(entryPath);
  }
})(
  {
    "./index.js": {
      code: `
    const {add} = require('./add.js')
    console.log(add(1,2))
        `,
    },
    "./add.js": {
      code: `
    module.exports.add = (x,y)=>x+y
        `,
    },
  },
  "./index.js"
);
