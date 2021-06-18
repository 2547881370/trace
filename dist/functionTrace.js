export class FunctionTrace {
    constructor(traceInfo) {
        this.traceId = this.getRandomId();
        this.traceInfo = traceInfo;
    }
    // 随机生成一个 ID 来标记
    getRandomId() {
        // 时间戳（9位） + 随机串（10位）
        return (Date.now()).toString(32) + Math.random().toString(32).substring(2);
    }
    // 更新该函数的一些信息
    update(traceInfo) {
        if (traceInfo.timeConsuming != null && traceInfo.timeConsuming != undefined)
            this.traceInfo.timeConsuming = traceInfo.timeConsuming;
        if (traceInfo.outParams != null && traceInfo.outParams != undefined)
            this.traceInfo.outParams = traceInfo.outParams;
    }
    // 执行该函数
    exec() {
        return this.traceInfo.originFunction.apply(this.traceInfo.context, this.traceInfo.inParams);
    }
    // 打印该函数的一些信息
    print() {
        const { functionName, timeConsuming, outParams, inParams } = this.traceInfo;
        return `
        functionName : ${functionName}
        inParams : ${JSON.stringify(inParams)}
        outParams : ${JSON.stringify(outParams)}
        timeConsuming : ${timeConsuming}
        `;
    }
}
