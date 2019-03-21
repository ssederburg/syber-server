"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const config = require("config");
const util = require("util");
class Utilities {
    static evalExpression(expression, source) {
        const exprs = expression.split('||');
        if (!exprs || exprs.length === 0) {
            return null;
        }
        let result = null;
        _.forEach(exprs, (expr) => {
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
    }
    static isDataType(value, dataType) {
        switch (dataType) {
            case 'string':
                return Utilities.isString(value);
            case 'date':
                return Utilities.isDate(value);
            case 'boolean':
                return Utilities.isBoolean(value);
            case 'number':
                return Utilities.isNumber(value);
            case 'array':
                return Utilities.isArray(value);
            case 'object':
                return Utilities.isObject(value);
            default:
                console.log(`Utilities.isDataType: No record of data type ${dataType}. Test ignored.`);
                return true;
        }
    }
    static isNullOrUndefined(value) {
        return value === null || value === undefined;
    }
    static isArray(value) {
        return Array.isArray(value);
    }
    static isDate(value) {
        return util.types.isDate(value);
    }
    static isRegEx(value) {
        return util.types.isRegExp(value);
    }
    static isBoolean(value) {
        return typeof value === 'boolean';
    }
    static isFunction(value) {
        return typeof value === 'function';
    }
    static isNull(value) {
        return value === null;
    }
    static isNumber(value) {
        return !isNaN(value);
    }
    static isObject(value) {
        return value !== null && typeof value === 'object';
    }
    static isString(value) {
        return typeof value === 'string';
    }
    readValue(documentPath, source) {
        if (documentPath.indexOf('/') < 0)
            return source[documentPath];
        const paths = documentPath.split('/');
        let reader = source;
        paths.forEach((element) => {
            if (reader !== null)
                reader = reader[element];
        });
        return reader;
    }
    writeValue(documentPath, value, source) {
        if (documentPath.indexOf('.') < 0)
            return source[documentPath] = value;
        const paths = documentPath.split('/');
        let reader = source;
        paths.forEach((element, index) => {
            if (index >= paths.length - 1) {
                return reader[element] = value;
            }
            reader = reader[element];
        });
    }
}
exports.Utilities = Utilities;
