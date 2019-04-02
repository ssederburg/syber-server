var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BaseProcessor } from '../processors';
import { Utilities } from '../utilities/utilities';
export class TestAsyncSleepProcessor extends BaseProcessor {
    fx() {
        const result = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let timeout = 0;
                if (!this.processorDef || !this.processorDef.args || !this.processorDef.args.timeout || !Utilities.isNumber(this.processorDef.args.timeout)) {
                    this.logger.warn(this.executionContext.correlationId, `SyberServer.TestSyncSleepProcessor.Warning: Invalid value set in schematic for args.timeout. Using default of 1 second.`, `testAsyncSleepProcessor.fx`);
                    timeout = 1000;
                }
                else {
                    timeout = this.processorDef.args.timeout;
                }
                yield this.runAsync(timeout);
                return resolve({
                    successful: true
                });
            }
            catch (err) {
                return reject(this.handleError(err, 'TestAsyncSleepProcessor', 500));
            }
        }));
        return result;
    }
    runAsync(timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = new Promise((resolve, reject) => {
                try {
                    setTimeout(() => {
                        return resolve();
                    }, timeout);
                }
                catch (err) {
                    return reject(this.handleError(err, `testAsyncSleepProcessor.runAsync`, 500));
                }
            });
            return result;
        });
    }
}
