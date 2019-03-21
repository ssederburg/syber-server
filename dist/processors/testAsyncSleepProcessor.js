"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const processors_1 = require("../processors");
const utilities_1 = require("../utilities/utilities");
class TestAsyncSleepProcessor extends processors_1.BaseProcessor {
    fx() {
        const result = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let timeout = 0;
                if (!this.processorDef || !this.processorDef.args || !this.processorDef.args.timeout || !utilities_1.Utilities.isNumber(this.processorDef.args.timeout)) {
                    console.log(`SyberServer.TestSyncSleepProcessor.Warning: Invalid value set in schematic for args.timeout. Using default of 1 second.`);
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
                return reject(this.handleError(err, 'TestAsyncSleepProcessor'));
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
                    return reject();
                }
            });
            return result;
        });
    }
}
exports.TestAsyncSleepProcessor = TestAsyncSleepProcessor;
