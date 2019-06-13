"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validators_1 = require("../validators");
function DateRange(whereToLook, whatToLookFor) {
    var options = Object.assign({}, whatToLookFor);
    return validators_1.MinDate(whereToLook, options) && validators_1.MaxDate(whereToLook, options);
}
exports.DateRange = DateRange;
