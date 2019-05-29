"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = require("../utilities/utilities");
function IsObject(whereToLook) {
    if (!whereToLook) {
        return false;
    }
    var trial1 = utilities_1.Utilities.isObject(whereToLook);
    if (trial1)
        return true;
    try {
        if (utilities_1.Utilities.isString(whereToLook)) {
            var trial2 = JSON.parse(whereToLook);
            return trial2 !== null;
        }
        return false;
    }
    catch (err) {
        return false;
    }
}
exports.IsObject = IsObject;
