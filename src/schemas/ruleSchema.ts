export interface IRuleContainerSchema {
    rules: Array<Rule>;         // Longhand list of Rules to be evaluated. May or may not have a groupId (be in a group)
    groups: Array<IRuleGroup>;  // If evaluating multiple groups of expressions, the list of groups and their ordering
    required: boolean;        // If the very first test before all others should be IsNotNullOrEmpty. If isRequired = false and value is null, no rules are executed.
}

export class Rule {
    public className: string;               // The className of the rule. Can be syber-server classNames OR custom if registered with syber-server at runtime
    public args: any;                       // Based on the requirement of the rule method e.g. Length requires an argument of min, max, match
    public ordinal?: number = 0;            // The order the rules will be evaluated in
    public conjunction?: string = 'and';    // and or or. ALWAYS LEADS the phrase e.g. 'and' means "previous rule AND this rule". Ignored if single rule in array.
    public dataType?: string = 'string';      // The type to treat the subject BEFORE evaluation e.g. string, number, float, date, boolean
    public group?: string;                  // If more than one group of expressions are involved. The group this rule belongs to.
    public shouldBe?: boolean = true;       // whether should eval to true or false e.g. (Length === 1) is true or false. If it evalulates to true, for this rule to pass, this requirement must be "true"
    public note?: string;
    public result?: boolean = false;               // Optional contextual note. Will be placed into rule engine results array if rule fails
}

export interface IRuleGroup {
    id: string;
    ordinal: number;
    conjunction: string;
    result?: boolean;
    notes: Array<string>;
}

/*
Some Samples
{
    // if (IsNumeric(value) && Range(value, 0, 100))
    rules: [
        {className: 'IsNumeric', ordinal: 0}
        {className: 'Range', args: {min: 0, max: 100}, ordinal: 1} // Default conjunction of AND
    ]

    // if (IsNumeric(value) && Range(value, 0, 100) || value === 999)
    rules: [
        {className: 'IsNumeric', ordinal: 0},
        {className: 'Range', args: {min: 0, max: 100}, ordinal: 1},
        {className: 'Equals', args: 999, asType: 'number', conjunction: 'or', ordinal: 2}
    ]

    // Could also write above rule using 2 groups
    // if ( (IsNumeric(value) && Range(value, 0, 100) ) || (value === 999) )
    rules: [
        {className: 'IsNumeric', ordinal: 0, group: 'A'}
        {className: 'Range', args: {min: 0, max: 100}, ordinal: 1, group: 'A'} // Default conjunction of AND
        {className: 'Equals', args:999, ordinal: 0, group: 'B'} // Conjunction ignore because inferred from group
    ]
    // If using above rules, groups required
    groups: [
        {id: 'A', ordinal: 0},
        {id: 'B', ordinal: 1, conjunction: 'or'}
    ]

    // Sample of using 'shouldBe' property notice the ! or NOT symbol
    if (!Range(value, 0, 100))
    rules: [
        {className: 'Range', args: {min: 0, max: 100}, shouldBe: false} // e.g. the rule must evaluate to false to be considered a PASS
    ]

}

BAKED IN syber-server rule classes
Contains - value, ignoreCase - args: {value: '1', ignoreCase: false}
ContainsAny - values: array<value>, ignoreCase - args: {values: ['1', '2'], ignoreCase: false}
EndsWith - value, ignoreCase - args: {value: '1', ignoreCase: false}
EndsWithAny - array<value>, ignoreCase - args: {values: ['1','2'], ignoreCase: false}
IsArray - none - args: null
IsFloat - none - args: null
IsObject - none - args: null
Length - min, max, length - args: {length: 3} - args: {min: 1, max: 10}
Max - value - args: 100
MaxDate - value - args: '12/31/2030' - args: 'now' - args: 'now + 1'
MaxLength - value - args: 10
Min - value - args: 0
MinDate - value - args: '01/01/2012' - args: 'now' - args: 'now - 365'
MinLength - value - args: 1
Range - min, max - args: {min: 0, max: 100} - may be numeric or date or datetime
StartsWith - value, ignoreCase - args: {value: '1', ignoreCase: false}
StartsWithAny - array<value>, ignoreCase - args: {values: ['1','2'], ignoreCase: false}
IsNotNullOrEmpty - trim, keywordMatch - args: {trim: true, keywordMatch: true} e.g. undefined is null, null text is null etc
IsNullOrEmpty - value, trim: true|false, keywordMatch: true|false
Equals - value - args: '123' - args: 123 MUST match same data type. asType is applied before test
EqualsAny
RegEx - value - args: 's^g'
IsDate - value, format - args: {format: 'MM/DD/YYYY'}
IsNumber - value - args: null
IsString - value
DateRange - min, max

*/
