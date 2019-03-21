export declare class Parameter {
    name: string;
    source: string;
    value?: string;
    description?: string;
    required?: boolean;
    dataType?: string;
    validators?: Array<any>;
    isValid?: boolean;
    whiteList?: Array<any>;
    blackList?: Array<any>;
}
