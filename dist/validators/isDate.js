"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = require("../utilities/utilities");
var moment = require("moment");
function IsDate(whereToLook, whatToLookFor) {
    var options = utilities_1.Utilities.isObject(whatToLookFor) ? whatToLookFor : { format: 'YYYY-MM-DD' };
    if (!whereToLook)
        return false;
    var fallbackAnswer = (moment.isDate(whereToLook) || moment.isMoment(whereToLook));
    try {
        if (!utilities_1.Utilities.isString(whereToLook))
            whereToLook = whereToLook.toString();
        var trial1 = utilities_1.Utilities.parseDateInput(whereToLook, options.format);
        if (!trial1) {
            return fallbackAnswer;
        }
        return true;
    }
    catch (_a) {
        return false;
    }
}
exports.IsDate = IsDate;
