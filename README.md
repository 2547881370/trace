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


## 1. 新建自定义loader
```js
// plugins/trace-loader.js

module.exports = function(source, map) {
  let functionReg = /^\s*\w+\(.*\)\s?\{/
  let methodsReg = /methods.*:.*{/g
  let startScriptReg = /<script.*>/g
  let endScriptReg = /<\/script.*>/g

  let scriptFlag = false
  let methodsFlag = false

  let oneScriptFlag = true

  let codes = source.split('\n')

  let content = []

  for (let index = 0; index < codes.length; index++) {
    let codeItem = codes[index]

    content.push(codeItem)

    // 进入script中
    if (!scriptFlag) {
      scriptFlag = startScriptReg.test(codeItem)

      if (scriptFlag && oneScriptFlag) {
        content.push('在<script> 中引入装饰器包')
        oneScriptFlag = false
      }
    }

    // 离开script
    if (endScriptReg.test(codeItem)) {
      scriptFlag = false
    }

    // 当如果在script中时,正则匹配是否进入了methods内部
    if (scriptFlag) {
      if (!methodsFlag) {
        methodsFlag = methodsReg.test(codeItem)
      }
    }

    if (scriptFlag && methodsFlag) {
      // 在函数体内部
      // console.log(codeItem)
      if (functionReg.test(codeItem)) {
        // 在methods中所有方法的头部增加装饰器
        let _codeItemCopy = content.pop()
        content.push('在methods中所有方法的头部增加装饰器')
        content.push(_codeItemCopy)
      }
    }
  }

  return content.join('\n')
}
```
##  2. 增加webpack配置
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


## vue-loader原理
```js
  // 将单文件组件进行解析
  /**
   * {
   *  template: {
   *    type : 'template',
   *    content: ''
   *  },
   *  script: {
   *     type: 'script',
   *     content: ''
   *  },
   *  styles:[
   *    {
   *       type: 'style',
   *       content: ''
   *    }
   *  ]
   * }
   * */
```
```