import { FunctionTrace } from "./functionTrace";
interface StashFunctionTrace {
    traceLevel?: number;
    trace: FunctionTrace;
}
export declare class FunctionTraceStash {
    private static _instance;
    level: number;
    traceList: StashFunctionTrace[];
    constructor();
    static getInstance(): FunctionTraceStash;
    start(trace: FunctionTrace): boolean;
    end(): void;
    getTrace(traceId: string): StashFunctionTrace | null;
    printTraceList(): string;
    printTraceCount(className?: string, functionName?: string): void;
    replay(): void;
    clear(): void;
}
export {};
