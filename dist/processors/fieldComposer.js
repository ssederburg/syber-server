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
var FieldComposer = (function (_super) {
    __extends(FieldComposer, _super);
    function FieldComposer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FieldComposer.prototype.fx = function () {
        var _this = this;
        var result = new Promise(function (resolve, reject) {
            try {
                var output_1 = {};
                if (!_this.executionContext.schematic.parameters || _this.executionContext.schematic.parameters.length <= 0) {
                    return resolve({
                        successful: false,
                        message: "No parameters listed in schematic"
                    });
                }
                _this.executionContext.schematic.parameters.forEach(function (parameter) {
                    output_1[parameter.name] = _this.executionContext.getParameterValue(parameter.name);
                });
                _this.executionContext.document = Object.assign({}, output_1);
                return resolve({
                    successful: true
                });
            }
            catch (err) {
                return reject(_this.handleError(err, 'FieldComposer'));
            }
        });
        return result;
    };
    return FieldComposer;
}(BaseProcessor));
export { FieldComposer };
