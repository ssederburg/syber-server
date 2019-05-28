import * as _ from 'lodash'
import * as config from 'config'
import * as util from 'util'
import * as moment from 'moment'

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
        if (!value) return false
        return Array.isArray(value)
    }

    public static isDate(value: any): boolean {
        if (!value) return false
        return util.types.isDate(value)
    }

    public static isRegEx(value: any): boolean {
        if (!value) return false
        return util.types.isRegExp(value)
    }

    public static isBoolean(value: any): boolean {
        return typeof value === 'boolean'
    }

    public static isFunction(value: any): boolean {
        if (!value) return false
        return typeof value === 'function'
    }

    public static isNull(value: any): boolean {
        return value === null
    }

    public static isNumber(value: any): boolean {
        if (value === null || value === undefined) return false
        return !isNaN(value)
    }

    public static isObject(value: any): boolean {
        if (!value) return false
        return value !== null && typeof value === 'object' && !Utilities.isArray(value)
    }

    public static isString(value: any): boolean {
        return typeof value === 'string'
    }

    public static toInt(value: any): number {
        if (!Utilities.isNumber(value)) return null
        return parseInt(value)
    }

    public static toFloat(value: any): number {
        if (!Utilities.isNumber(value)) return null
        return parseFloat(value)
    }

    public static toDate(value: any, format?: string): Date {
        // TODO: Add formatting
        if (!value) return null
        return Utilities.parseDateInput(value, format)
    }

    public static parseDateInput (input: any, format: string): Date {

        let theDate = null
    
        try {
            if (!Utilities.isDate(input)) {
                if (input.indexOf('now') >= 0) {
                    if (input.indexOf('+') >= 0 || input.indexOf('-') >= 0) {
                        const trimmed = input.replace(/\s/g, '')
                        const baseDate = moment.utc()
                        const sign = trimmed.indexOf('+') >= 0 ? '+' : '-'
                        const offset = trimmed.substr(trimmed.indexOf(sign) + 1)
                        theDate = sign === '+' ? baseDate.add(offset , 'days') : baseDate.subtract(offset, 'days')
                        //console.log(`1. ${input} ${trimmed} ${baseDate} ${sign} ${offset} ${theDate.format()}`)
                    } else {
                        theDate = moment.utc()
                        //console.log(`2. ${input} ${theDate.format()}`)
                    }
                } else {
                    theDate = moment(input, format)
                    if (!theDate.isValid()) {
                        return null
                    }
                    //console.log(`3. ${input} ${theDate.format()}`)
                }
            } else {
                theDate = moment(input)
                if (!theDate.isValid()) {
                    return null
                }
                //console.log(`4. ${input} ${theDate.format()}`)
            }
            //console.log(`Parsing Date: ${input} with format ${format}: ${theDate.format()}`)
            return theDate
        } catch (err) {
            //console.log(`Unable to parse MaxDate: ${input} with format ${format}`)
            return null
        }
    
    }
    
    public static toBoolean(value: any): boolean {
        if (value === null || value === undefined) return null
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