import { Utilities } from '../utilities/utilities'

export function Length(whereToLook: any, whatToLookFor: any): boolean {
    const options = Utilities.isObject(whatToLookFor) ? whatToLookFor : {length: whatToLookFor}

    if (!whatToLookFor) return false
    if (!whereToLook) return false

    if (!Utilities.isString(whereToLook)) whereToLook = whereToLook.toString()

    // If explicit length variable is sent, inspect and ensure the subject is EXACTLY that length
    if (options.length === 0) {
        // Need a special case since 0 would be evaluated as false. So, check if length variable passed in is 0 itself.
        return whereToLook.length === 0
    }

    if (options.length > 0) {
        return whereToLook.length === options.length
    }

    // Now we can handle Min and/or Max
    if (!options.min) {
        options.min = 0
    }
    if (!options.max) {
        options.max = Number.MAX_VALUE
    }
    if (options.min > options.max) return false
    
    return whereToLook.length >= options.min && whereToLook.length <= options.max

}
