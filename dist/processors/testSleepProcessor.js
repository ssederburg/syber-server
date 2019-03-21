"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schemas_1 = require("../schemas");
const utilities_1 = require("../utilities/utilities");
class TestSyncSleepProcessor extends schemas_1.BaseProcessor {
    fx(args) {
        const result = new Promise((resolve, reject) => {
            try {
                let timeout = 0;
                if (!args || !args.timeout || !utilities_1.Utilities.isNumber(args.timeout)) {
                    console.log(`SyberServer.TestSyncSleepProcessor.Warning: Invalid value set in schematic for args.timeout. Using default of 1 second.`);
                    timeout = 1000;
                }
                else {
                    timeout = args.timeout;
                }
                setTimeout(() => {
                    return resolve({
                        successful: true
                    });
                }, timeout);
            }
            catch (err) {
                return reject({
                    successful: false,
                    message: `TestSyncSleepProcessor.Error`,
                    data: err
                });
            }
        });
        return result;
    }
}
exports.TestSyncSleepProcessor = TestSyncSleepProcessor;
