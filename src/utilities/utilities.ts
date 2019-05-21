import * as _ from 'lodash'
import * as config from 'config'
import * as util from 'util'

export class Utilities {

    public static evalExpression(expression: string, source: any): any {

        const exprs = expression.split('||')
        if (!exprs || exprs.length === 0) {
            return null
        }

        let result = null
        _.forEach(exprs, (expr) => {
            if (Utilities.isNullOrUndefined(result) && expr) {
                if (expr.indexOf('req.query.')===0) {
                    result = source.query[expr.replace('req.query.','')]
                }
                if (expr.indexOf('req.body.')===0) {
                    result = source.body[expr.replace('req.body.', '')]
                }
                if (expr.indexOf('process.env.')===0) {
                    result = process.env[expr.replace('process.env.', '')]
                }
                if (expr.indexOf('config.')===0) {
                    result = config[expr.replace('config.', '')]
                }
                if (expr.indexOf('req.cookies.')===0) {
                    result = source.cookies[expr.replace('req.cookies.', '')]
                }
                if (expr.indexOf('req.params.')===0) {
                    result = source.params[expr.replace('req.params.', '')]
                }
                if (expr.indexOf('req.signedCookies.')===0) {
                    result = source.params[expr.replace('req.signedCookies.', '')]
                }
                if (expr.indexOf('req.headers.')===0) {
                    result = source.get(expr.replace('req.headers.', ''))
                }
                if (expr.indexOf('=')===0) {
                    result = expr.replace('=', '')
                }
                if (expr.indexOf('req.id')===0) {
                    result = source.id
                }
            }
        })
        return result
        
    }

    // TODO: dataType as enum

    public static isDataType(value: any, dataType: string): boolean {
        switch(dataType) {
            case 'string':
                return Utilities.isString(value)
            case 'date':
                return Utilities.isDate(value)
            case 'boolean':
                return Utilities.isBoolean(value)
            case 'number':
                return Utilities.isNumber(value)
            case 'array':
                return Utilities.isArray(value)
            case 'object':
                return Utilities.isObject(value)
            default:
                return false
        }
    }

    public static isNullOrUndefined(value: any): boolean {
        return value === null || value === undefined
    }

    public static isArray(value: any): boolean {
        return Array.isArray(value)
    }

    public static isDate(value: any): boolean {
        return util.types.isDate(value)
    }

    public static isRegEx(value: any): boolean {
        return util.types.isRegExp(value)
    }

    public static isBoolean(value: any): boolean {
        return typeof value === 'boolean'
    }

    public static isFunction(value: any): boolean {
        return typeof value === 'function'
    }

    public static isNull(value: any): boolean {
        return value === null
    }

    public static isNumber(value: any): boolean {
        return !isNaN(value)
    }

    public static isObject(value: any): boolean {
        return value !== null && typeof value === 'object'
    }

    public static isString(value: any): boolean {
        return typeof value === 'string'
    }

    public static toInt(value: any): number {
        return parseInt(value)
    }

    public static toFloat(value: any): number {
        return parseFloat(value)
    }

    public static toDate(value: any): Date {
        // TODO: Add formatting
        return new Date(value.toString())
    }

    public static toBoolean(value: any): boolean {
        const theValue = value.toString().toLowerCase()
        if (theValue === 'true' || theValue === '1' || theValue === 'yes' || theValue === 'on') {
            return true
        }
        return false
    }

    public readValue(documentPath: string, source: any): string|any {

        if (documentPath.indexOf('/') < 0) return source[documentPath]
        const paths = documentPath.split('/')
        let reader: any = source
        paths.forEach((element) => {
            if (reader !== null) reader = reader[element]
        })
        return reader

    }

    public writeValue(documentPath: string, value: any, source: any) {

        if (documentPath.indexOf('.') < 0) return source[documentPath] = value
        const paths = documentPath.split('/')
        let reader: any = source
        paths.forEach((element, index) => {
            if (index >= paths.length - 1) {
                return reader[element] = value
            }
            reader = reader[element]
        })

    }    

}