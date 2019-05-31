import { Utilities } from '../utilities/utilities'

// Default date format if string is 'YYYY-MM-DD'
// If different format, provide in format field of argument option argument
// { max: MaximumDateValue, format: 'YYYY-MM-DD', sourceFormat?: 'YYYY-MM-DD'}
// max of 'now' replaced with current date
// whereToLook with value of 'now' replaced with current date
// Can add or subtract days from current day by using syntax 'now+days' or 'now-days' where days is the number of days to add or subtract
//  e.g. 'now - 30' (spaces are ignored) is current day - 30 days. 'now + 1' is current day + 1 day
// sourceFormat argument is the format of the whereToLook parameter

export function MaxDate(whereToLook: any, whatToLookFor: any): boolean {

    const options = Utilities.isObject(whatToLookFor) ? whatToLookFor : {max: whatToLookFor, maxFormat: 'YYYY-MM-DD', sourceFormat: 'YYYY-MM-DD'}

    whereToLook = Utilities.parseDateInput(whereToLook, options.sourceFormat || 'YYYY-MM-DD')
    options.max = Utilities.parseDateInput(options.max, options.maxFormat || 'YYYY-MM-DD')
    
    if (!whereToLook || !options.max) return false

    return whereToLook <= options.max

}
