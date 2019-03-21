"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const processors_1 = require("../processors");
const utilities_1 = require("../utilities/utilities");
class TestSyncSleepProcessor extends processors_1.BaseProcessor {
    fx() {
        const result = new Promise((resolve, reject) => {
            try {
                let timeout = 0;
                if (!this.processorDef || !this.processorDef.args || !this.processorDef.args.timeout || !utilities_1.Utilities.isNumber(this.processorDef.args.timeout)) {
                    console.log(`SyberServer.TestSyncSleepProcessor.Warning: Invalid value set in schematic for args.timeout. Using default of 1 second.`);
                    timeout = 1000;
                }
                else {
                    timeout = this.processorDef.args.timeout;
                }
                setTimeout(() => {
                    return resolve({
                        successful: true
                    });
                }, timeout);
            }
            catch (err) {
                return reject(this.handleError(err, 'TestSyncSleepProcessor'));
            }
        });
        return result;
    }
}
exports.TestSyncSleepProcessor = TestSyncSleepProcessor;
