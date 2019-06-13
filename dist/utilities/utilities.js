"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var config = require("config");
var util = require("util");
var moment = require("moment");
var validators_1 = require("../validators");
var Utilities = (function () {
    function Utilities() {
    }
    Utilities.evalExpression = function (expression, source) {
        var exprs = expression.split('||');
        if (!exprs || exprs.length === 0) {
            return null;
        }
        var result = null;
        _.forEach(exprs, function (expr) {
            if (Utilities.isNullOrUndefined(result) && expr) {
                if (expr.indexOf('req.query.') === 0) {
                    result = source.query[expr.replace('req.query.', '')];
                }
                if (expr.indexOf('req.body.') === 0) {
                    result = source.body[expr.replace('req.body.', '')];
                }
                if (expr.indexOf('process.env.') === 0) {
                    result = process.env[expr.replace('process.env.', '')];
                }
                if (expr.indexOf('config.') === 0) {
                    result = config[expr.replace('config.', '')];
                }
                if (expr.indexOf('req.cookies.') === 0) {
                    result = source.cookies[expr.replace('req.cookies.', '')];
                }
                if (expr.indexOf('req.params.') === 0) {
                    result = source.params[expr.replace('req.params.', '')];
                }
                if (expr.indexOf('req.signedCookies.') === 0) {
                    result = source.params[expr.replace('req.signedCookies.', '')];
                }
                if (expr.indexOf('req.headers.') === 0) {
                    result = source.get(expr.replace('req.headers.', ''));
                }
                if (expr.indexOf('=') === 0) {
                    result = expr.replace('=', '');
                }
                if (expr.indexOf('req.id') === 0) {
                    result = source.id;
                }
            }
        });
        return result;
    };
    Utilities.isDataType = function (value, dataType) {
        switch (dataType) {
            case 'string':
                return Utilities.isString(value);
            case 'date':
                return Utilities.isDate(value);
            case 'boolean':
                return Utilities.isBoolean(value);
            case 'number':
                return Utilities.isNumber(value);
            case 'float':
            case 'decimal':
                return validators_1.IsFloat(value);
            case 'array':
                return Utilities.isArray(value);
            case 'object':
                return Utilities.isObject(value);
            default:
                return false;
        }
    };
    Utilities.isNullOrUndefined = function (value) {
        return value === null || value === undefined;
    };
    Utilities.isArray = function (value) {
        if (!value)
            return false;
        return Array.isArray(value);
    };
    Utilities.isDate = function (value) {
        if (!value)
            return false;
        return util.isDate(value);
    };
    Utilities.isRegEx = function (value) {
        if (!value)
            return false;
        return util.types.isRegExp(value);
    };
    Utilities.isBoolean = function (value) {
        return typeof value === 'boolean';
    };
    Utilities.isFunction = function (value) {
        if (!value)
            return false;
        return typeof value === 'function';
    };
    Utilities.isNull = function (value) {
        return value === null;
    };
    Utilities.isNumber = function (value) {
        if (value === null || value === undefined)
            return false;
        return !isNaN(value);
    };
    Utilities.isInteger = function (value) {
        if (value === null || value === undefined)
            return false;
        var isNumber = !isNaN(value);
        return isNumber && value.toString().indexOf('.') < 0;
    };
    Utilities.isObject = function (value) {
        if (!value)
            return false;
        return value !== null && typeof value === 'object' && !Utilities.isArray(value);
    };
    Utilities.isString = function (value) {
        return typeof value === 'string';
    };
    Utilities.toInt = function (value) {
        if (!Utilities.isNumber(value))
            return null;
        return parseInt(value);
    };
    Utilities.toFloat = function (value) {
        if (!Utilities.isNumber(value))
            return null;
        return parseFloat(value);
    };
    Utilities.toDate = function (value, format) {
        if (!value)
            return null;
        return Utilities.parseDateInput(value, format);
    };
    Utilities.parseDateInput = function (input, format) {
        var theDate = null;
        try {
            if (!Utilities.isDate(input)) {
                if (input.indexOf('now') >= 0) {
                    if (input.indexOf('+') >= 0 || input.indexOf('-') >= 0) {
                        var trimmed = input.replace(/\s/g, '');
                        var baseDate = moment.utc();
                        var sign = trimmed.indexOf('+') >= 0 ? '+' : '-';
                        var offset = trimmed.substr(trimmed.indexOf(sign) + 1);
                        theDate = sign === '+' ? baseDate.add(offset, 'days') : baseDate.subtract(offset, 'days');
                    }
                    else {
                        theDate = moment.utc();
                    }
                }
                else {
                    theDate = moment(input, format);
                    if (!theDate.isValid() || input.length !== format.length) {
                        return null;
                    }
                }
            }
            else {
                theDate = moment(input);
                if (!theDate.isValid()) {
                    return null;
                }
            }
            return theDate;
        }
        catch (err) {
            return null;
        }
    };
    Utilities.toBoolean = function (value) {
        if (value === null || value === undefined)
            return null;
        var theValue = value.toString().toLowerCase();
        if (theValue === 'true' || theValue === '1' || theValue === 'yes' || theValue === 'on') {
            return true;
        }
        return false;
    };
    Utilities.toDataType = function (value, dataType) {
        var convertedValue = value;
        switch (dataType) {
            case 'string':
                convertedValue = value.toString();
                break;
            case 'number':
                convertedValue = Utilities.toInt(value);
                break;
            case 'decimal':
            case 'float':
                convertedValue = Utilities.toFloat(value);
                break;
            case 'date':
                convertedValue = Utilities.toDate(value);
                break;
            case 'boolean':
            case 'bool':
                convertedValue = Utilities.toBoolean(value);
                break;
            default:
                convertedValue = value;
        }
        return convertedValue;
    };
    Utilities.prototype.readValue = function (documentPath, source) {
        if (documentPath.indexOf('/') < 0)
            return source[documentPath];
        var paths = documentPath.split('/');
        var reader = source;
        paths.forEach(function (element) {
            if (reader !== null)
                reader = reader[element];
        });
        return reader;
    };
    Utilities.prototype.writeValue = function (documentPath, value, source) {
        if (documentPath.indexOf('.') < 0)
            return source[documentPath] = value;
        var paths = documentPath.split('/');
        var reader = source;
        paths.forEach(function (element, index) {
            if (index >= paths.length - 1) {
                return reader[element] = value;
            }
            reader = reader[element];
        });
    };
    return Utilities;
}());
exports.Utilities = Utilities;
