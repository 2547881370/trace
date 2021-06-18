# 安装
```
npm i vue-function-trace --save
```

# 使用
```js
import { logPerformance , FunctionTraceStash } from "vue-function-trace";

interface IPerson {
    userName: string;
    SexName: string;
}

class Person {
    userName: string;
    SexName: string;

    constructor(userName?: string, SexName?: string) {
        this.userName = userName;
        this.SexName = SexName;
    }

    @logPerformance
    setUserName(userName: string) {
        this.userName = userName;
    }

    @logPerformance
    setUserSexName(SexName: string) {
        this.SexName = SexName;
    }

    @logPerformance
    setPersonInfo(userName: string, SexName: string) {
        this.setUserName(userName)
        this.setUserSexName(userName)
    }

    @logPerformance
    getPersonInfo(): IPerson {
        let index = 0
        while (index < 100000){
            index++
        }
        return {
            userName: this.userName,
            SexName: this.SexName
        }
    }
}


let person = new Person("John", "男");
person.setPersonInfo("John-0", "男-0")
let personInfo = person.getPersonInfo()

// 打印堆栈信息
console.log(FunctionTraceStash.getInstance().printTraceList())

// 重放该堆栈
FunctionTraceStash.getInstance().replay()

// 清空堆栈
FunctionTraceStash.getInstance().clear()

```
```js
<template>
  ../
</template>

<script>
  import { logPerformance , FunctionTraceStash } from "vue-function-trace";

  export default {
    methods: {
      @logPerformance
      test(){}
    }
}
</script>
```