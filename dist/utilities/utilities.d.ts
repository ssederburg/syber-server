export declare class Utilities {
    static evalExpression(expression: string, source: any): any;
    static isDataType(value: any, dataType: string): boolean;
    static isNullOrUndefined(value: any): boolean;
    static isArray(value: any): boolean;
    static isDate(value: any): boolean;
    static isRegEx(value: any): boolean;
    static isBoolean(value: any): boolean;
    static isFunction(value: any): boolean;
    static isNull(value: any): boolean;
    static isNumber(value: any): boolean;
    static isObject(value: any): boolean;
    static isString(value: any): boolean;
    readValue(documentPath: string, source: any): string | any;
    writeValue(documentPath: string, value: any, source: any): any;
}
