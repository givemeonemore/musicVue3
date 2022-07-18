// 获取该文件夹下所有的文件
export const addDirectives = (app) => {
  // 检索目录下的模块，相当于引入该文件夹下的所有文件
  // 此处如果不安装 webpack-env 的类型注解，此处会报错
  // 解决方法： 1、类型“NodeRequire”上不存在属性“context”；2、tsconfig.json 中在 types 数组中添加 webpack-env，如："types": ["node", "webpack-env"]
  // const req = require.context('.', true, /\.js$/);
  // vite 不可以使用 require，应该使用 import.meta.globEager
  const modules = import.meta.globEager('./*.ts');
  console.log(modules, 'modules');
  for (const path in modules) {
    // require模块，相当于 require 文件（或 import 格式）
    const componentConfig = modules[path].default;
    const name = path.replace(/^\.\/(.*\/)?/, '').replace(/\.ts$/, '');
    console.log(componentConfig, 'componentConfig');

    app.directive(name, componentConfig);
  }
};
