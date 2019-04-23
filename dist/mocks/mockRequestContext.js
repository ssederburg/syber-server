"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var schemas_1 = require("../schemas");
var uuidv4 = require('uuid/v4');
var MockRequestContext = (function (_super) {
    __extends(MockRequestContext, _super);
    function MockRequestContext(requestBody) {
        var _this = _super.call(this) || this;
        _this.id = uuidv4();
        _this.body = {};
        _this.cookies = {};
        _this.signedCookies = {};
        _this.method = 'POST';
        _this.params = {};
        _this.query = {};
        _this.user = {
            isAuthenticated: true
        };
        _this.starttime = new Date();
        if (requestBody) {
            _this.body = Object.assign({}, requestBody);
        }
        return _this;
    }
    return MockRequestContext;
}(schemas_1.RequestContext));
exports.MockRequestContext = MockRequestContext;
