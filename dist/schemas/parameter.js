"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Parameter {
    constructor() {
        this.required = false;
        this.dataType = 'string';
        this.validators = [];
        this.isValid = true;
        this.whiteList = [];
        this.blackList = [];
    }
}
exports.Parameter = Parameter;
