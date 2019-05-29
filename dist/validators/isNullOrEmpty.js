"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validators_1 = require("../validators");
function IsNullOrEmpty(whereToLook, whatToLookFor) {
    return !validators_1.IsNotNullOrEmpty(whereToLook, whatToLookFor);
}
exports.IsNullOrEmpty = IsNullOrEmpty;
