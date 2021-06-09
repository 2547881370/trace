import { FunctionTrace } from "./functionTrace";

interface StashFunctionTrace {
    traceLevel?: number;
    trace: FunctionTrace;
}

export class FunctionTraceStash {
    private static _instance = null;
    
    level: number; // 当前层级，默认为0
    traceList: StashFunctionTrace[]; // Trace数组

    constructor() {
        this.level = 0;
        this.traceList = [];
    }

    	//获得实例对象
	public static getInstance():FunctionTraceStash{
		if(!this._instance){
			this._instance = new FunctionTraceStash();
		}
		return this._instance;
	}

    // 开始本次 Trace
    // 添加该 Trace 之后将 level + 1，便于记录当前 Trace 的层次
    start(trace: FunctionTrace) {
        // 如果一个函数重复执行,将当前位置的函数移除掉,重新更新更新当前位置的追踪对象
        if(this.traceList.length > 0 && trace.traceInfo.functionName === this.traceList[this.traceList.length - 1].trace.traceInfo.functionName){
            this.traceList[this.traceList.length - 1] = {
                trace,
                traceLevel : this.level
            }
            this.level += 1
            return false
        }
        this.level += 1
        this.traceList.push({
            trace,
            traceLevel : this.level
        })
    }

    // 结束本次 Trace
    end() {
        this.level -= 1
    }

    // 根据 traceId 获取某个 Trace 对象
    getTrace(traceId: string): StashFunctionTrace | null {
        return this.traceList.find((stashTrace) => stashTrace.trace.traceId === traceId) || null;
    }

    // 打印 Trace 堆栈信息
    printTraceList(): string {
        const traceStringList: string[] = [];
        this.traceList.forEach((stashTrace) => {
            let prefix = '';
            if (stashTrace.traceLevel && stashTrace.traceLevel > 0) {
                // 根据层次，前置 tab
                prefix = new Array(stashTrace.traceLevel).join('\t');
            }
            traceStringList.push(prefix + stashTrace.trace.print());
        });
        return traceStringList.join('\n');
    }

    // 打印函数调用次数统计
    printTraceCount(className?: string, functionName?: string) {}

    // 重放该堆栈
    replay() {
        this.traceList.forEach((stashTrace) => {
            stashTrace.trace.exec()
        });
    }

    // 清空该堆栈信息
    clear() {
        this.level = 0;
        this.traceList=[]
    }
}

window["log"] = FunctionTraceStash
