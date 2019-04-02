"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Parameter = (function () {
    function Parameter() {
        this.required = false;
        this.dataType = 'string';
        this.validators = [];
        this.isValid = true;
        this.whiteList = [];
        this.blackList = [];
    }
    return Parameter;
}());
exports.Parameter = Parameter;
