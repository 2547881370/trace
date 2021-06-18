import { FunctionTrace } from "./functionTrace";
import { FunctionTraceStash } from "./functionTraceStash";
export function logPerformance(target, name, descriptor) {
    const original = descriptor && descriptor.value;
    if (typeof original === "function") {
        descriptor.value = function (...args) {
            let start = new Date().valueOf();
            let trace = new FunctionTrace({
                context: this,
                functionName: name,
                inParams: args,
                originFunction: original,
            });
            FunctionTraceStash.getInstance().start(trace);
            try {
                const result = original.apply(this, args);
                trace.update({
                    outParams: result
                });
                return result;
            }
            catch (e) {
                // TODO : 记录报错信息,上传服务器
                throw e;
            }
            finally {
                let end = new Date().valueOf();
                trace.update({
                    timeConsuming: end - start
                });
                FunctionTraceStash.getInstance().end();
            }
        };
    }
    return descriptor;
}
