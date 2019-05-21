export interface IRuleContainerSchema {
    andsies: Array<Rule>; // Shorthand grouping of rules that are joined by AND conjunction
    orsies: Array<Rule>;  // Shorthand grouping of rules that are joined by OR conjunction
    rules: Array<Rule>;   // Longhand list of Rules to be evaluated. May or may not have a groupId (be in a group)
    groups: Array<IRuleGroup>;  // If evaluating multiple groups of expressions, the list of groups and their ordering
}

export class Rule {
    public className: string;               // The className of the rule. Can be syber-server classNames OR custom if registered with syber-server at runtime
    public args: any;                       // Based on the requirement of the rule method e.g. Length requires an argument of min, max, match
    public ordinal?: number = 0;            // The order the rules will be evaluated in
    public conjunction?: string = 'and';    // and or or. ALWAYS LEADS the phrase e.g. 'and' means "previous rule AND this rule". Ignored if single rule in array.
    public asType?: string = 'string';      // The type to treat the subject BEFORE evaluation e.g. string, number, float, date, boolean
    public group?: string;                  // If more than one group of expressions are involved. The group this rule belongs to.
    public requirement?: boolean = true;    // whether should eval to true or false e.g. (Length === 1) is true or false. If it evalulates to true, for this rule to pass, this requirement must be "true"
    public note?: string;                   // Optional contextual note. Will be placed into rule engine results array if rule fails
}

export interface IRuleGroup {
    id: string;
    ordinal: number;
    conjunction: string;
}

/*
Some Samples
{
    // if (IsNumeric(value) && Range(value, 0, 100))
    andsies: [
        {className: 'IsNumeric', ordinal: 0}
        {className: 'Range', args: {min: 0, max: 100}, ordinal: 1} // Default conjunction of AND
    ]

    // if (Range(value, 0, 100) || value.toInt() === 999)
    orsies: [
        {predicate: {className: 'Range', args: {min: 0, max: 100}}, ordinal: 0}, // Default conjunction of OR
        {predicate: {className: 'IsValue', args: {value: 999, as: 'number'}}, ordinal: 1} // Default conjunction of AND
    ]

    // if (IsNumeric(value) && Range(value, 0, 100) || value.toInt() === 999)
    rules: [
        {predicate: {className: 'IsNumeric'}, ordinal: 0}
        {predicate: {className: 'Range', args: {min: 0, max: 100}}, ordinal: 1} // Default conjunction of AND
        {predicate: {className: 'IsValue', args: {value: 999, as: 'number'}}, ordinal: 0, conjunction: 'or'}
    ]

    // Could also write above rule using 2 groups
    // if ( (IsNumeric(value) && Range(value, 0, 100) ) || (value.toInt() === 999) )
    rules: [
        {predicate: {className: 'IsNumeric'}, ordinal: 0, group: 'A'}
        {predicate: {className: 'Range', args: {min: 0, max: 100}}, ordinal: 1, group: 'A'} // Default conjunction of AND
        {predicate: {className: 'IsValue', args: {value: 999, as: 'number'}}, ordinal: 0, group: 'B'} // Conjunction ignore because inferred from group
    ]
    // If using above rules, groups required
    groups: [
        {id: 'A', ordinal: 0},
        {id: 'B', ordinal: 1, conjunction: 'or'}
    ]

    // Sample of using 'requirement' property notice the ! or NOT symbol
    if (!Range(value, 0, 100))
    rules: [
        {predicate: {className: 'Range', args: {min: 0, max: 100}}, requirement: false} // e.g. the rule must evaluate to false to be considered a PASS
    ]

}

BAKED IN syber-server rule classes
Contains
ContainsAny
EndsWith
EndsWithAny
IsArray
IsFloat
IsObject
Length
Max
MaxDate
MaxLength
Min
MinDate
MinLength
Range
StartsWith
StartsWithAny
IsNotNullOrEmpty
RegEx

*/
