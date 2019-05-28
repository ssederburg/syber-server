import { Utilities } from '../utilities/utilities'

// Default date format if string is 'YYYY-MM-DD'
// If different format, provide in format field of argument option argument
// { min: MinimumDateValue, format: 'YYYY-MM-DD', sourceFormat?: 'YYYY-MM-DD'}
// min of 'now' replaced with current date
// whereToLook with value of 'now' replaced with current date
// Can add or subtract days from current day by using syntax 'now+days' or 'now-days' where days is the number of days to add or subtract
//  e.g. 'now - 30' (spaces are ignored) is current day - 30 days. 'now + 1' is current day + 1 day
// sourceFormat argument is the format of the whereToLook parameter

export function MinDate(whereToLook: any, whatToLookFor: any): Boolean {

    const options = Utilities.isObject(whatToLookFor) ? whatToLookFor : {min: whatToLookFor, minFormat: 'YYYY-MM-DD', sourceFormat: 'YYYY-MM-DD'}

    whereToLook = Utilities.parseDateInput(whereToLook, options.sourceFormat || 'YYYY-MM-DD')
    options.min = Utilities.parseDateInput(options.min, options.minFormat || 'YYYY-MM-DD')
    
    if (!whereToLook || !options.min) return false

    return whereToLook >= options.min

}
