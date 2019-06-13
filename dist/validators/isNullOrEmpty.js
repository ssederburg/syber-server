"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validators_1 = require("../validators");
function IsNullOrEmpty(whereToLook, whatToLookFor) {
    var options = Object.assign({}, whatToLookFor);
    return !validators_1.IsNotNullOrEmpty(whereToLook, options);
}
exports.IsNullOrEmpty = IsNullOrEmpty;
