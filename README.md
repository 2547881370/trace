+ 待优化
  + 命名规范
  + 执行堆栈的最大长度优化,目前是无限制

+ 未实现
  + 发布npm包,这个包只做一件事情(装饰器功能)
  + 发布一个loader加载器的包,加载器依赖上面的npm包;适配vue3cli,使用loader加载,将methods内的方法全部统一加上装饰器
  + 参考
    + [自定义 loader 读取 *.vue 文件源码](https://juejin.cn/post/6904686261080948750)
    + [从vue-loader源码分析CSS Scoped的实现](https://juejin.cn/post/6844903949900742670)
    + [@babel/core
](https://www.babeljs.cn/docs/babel-core#options)

```js
// plugins/trace-loader.js

const fs = require('fs')
const { baseParse } = require('@vue/compiler-core')
const { transform } = require('@babel/core')
const t = require('babel-types')

module.exports = function(source, map) {
  const { resourcePath } = this
  // 2. 读取文件内容
  const file = fs.readFileSync(resourcePath).toString()
  // <script>[\d\w\s\D\W\S]*</script>

  // TODO : 在<script> 中引入装饰器包
  // TODO : 在methods中所有方法的头部增加装饰器
  // TODO : 将修改好的source重新组装返回

  fs.writeFileSync('write1.txt', source)
  console.log(file)
  return source
}

```

```js
// vue.config.js

configureWebpack : {
  /...
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: path.resolve(__dirname, './plugins/trace-loader.js')
        }
      ]
    }
  .../
}
```
