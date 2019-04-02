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
import { ProcessorDef } from '../schemas';
var SchematicResponse = (function (_super) {
    __extends(SchematicResponse, _super);
    function SchematicResponse() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.httpStatus = 200;
        _this.useResolver = false;
        _this.schema = null;
        return _this;
    }
    SchematicResponse.prototype.resolve = function (executionContext) {
        return null;
    };
    return SchematicResponse;
}(ProcessorDef));
export { SchematicResponse };
