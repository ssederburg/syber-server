var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { BaseProcessor } from '../processors';
import { Utilities } from '../utilities/utilities';
var TestSyncSleepProcessor = (function (_super) {
    __extends(TestSyncSleepProcessor, _super);
    function TestSyncSleepProcessor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestSyncSleepProcessor.prototype.fx = function () {
        var _this = this;
        var result = new Promise(function (resolve, reject) {
            try {
                var timeout = 0;
                if (!_this.processorDef || !_this.processorDef.args || !_this.processorDef.args.timeout || !Utilities.isNumber(_this.processorDef.args.timeout)) {
                    _this.logger.warn("SyberServer.TestSyncSleepProcessor.Warning: Invalid value set in schematic for args.timeout. Using default of 1 second.", "testSyncSleepProcessor.fx");
                    timeout = 1000;
                }
                else {
                    timeout = _this.processorDef.args.timeout;
                }
                setTimeout(function () {
                    return resolve({
                        successful: true
                    });
                }, timeout);
            }
            catch (err) {
                return reject(_this.handleError(err, 'TestSyncSleepProcessor', 500));
            }
        });
        return result;
    };
    return TestSyncSleepProcessor;
}(BaseProcessor));
export { TestSyncSleepProcessor };
