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
var HttpStatusResponse = (function (_super) {
    __extends(HttpStatusResponse, _super);
    function HttpStatusResponse() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HttpStatusResponse.prototype.fx = function () {
        var _this = this;
        var result = new Promise(function (resolve, reject) {
            try {
                if (!_this.processorDef || !_this.processorDef.args || !_this.processorDef.args.httpStatus) {
                    _this.logger.warn("Attempted to use HttpStatusResponse without setting argument for httpStatus in processor definition element", "httpStatusResponse.fx");
                    _this.processorDef.args = {
                        httpStatus: 200
                    };
                }
                return resolve({
                    successful: true,
                    message: 'OK',
                    httpStatus: _this.processorDef.args.httpStatus || 200,
                    data: null
                });
            }
            catch (err) {
                reject(_this.handleError(err, 'HttpStatusResponse'));
            }
        });
        return result;
    };
    return HttpStatusResponse;
}(BaseProcessor));
export { HttpStatusResponse };
