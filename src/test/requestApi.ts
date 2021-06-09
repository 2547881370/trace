import { FunctionTraceStash } from "..";
import { logPerformance } from "../logPerformance";

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

console.log(FunctionTraceStash.getInstance().printTraceList())