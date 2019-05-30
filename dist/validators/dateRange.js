"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validators_1 = require("../validators");
function DateRange(whereToLook, whatToLookFor) {
    return validators_1.MinDate(whereToLook, whatToLookFor) && validators_1.MaxDate(whereToLook, whatToLookFor);
}
exports.DateRange = DateRange;
