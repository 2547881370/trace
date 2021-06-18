interface IFunctionTraceInfo {
    context?: string;
    functionName?: string;
    inParams?: any[] | null;
    outParams?: any[] | null;
    timeConsuming?: number;
    originFunction?: Function;
}
export declare class FunctionTrace {
    traceId: string;
    traceInfo: IFunctionTraceInfo;
    constructor(traceInfo: IFunctionTraceInfo);
    getRandomId(): string;
    update(traceInfo: IFunctionTraceInfo): void;
    exec(): any;
    print(): string;
}
export {};
