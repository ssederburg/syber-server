export interface IRuleContainerSchema {
    rules: Array<Rule>;
    groups?: Array<IRuleGroup>;
    required?: boolean;
    name: string;
    dataType?: string;
}
export declare class Rule {
    className: string;
    args: any;
    ordinal?: number;
    conjunction?: string;
    dataType?: string;
    group?: string;
    shouldBe?: boolean;
    note?: string;
    result?: boolean;
}
export interface IRuleGroup {
    id: string;
    ordinal: number;
    conjunction: string;
    result?: boolean;
    notes: Array<string>;
}
