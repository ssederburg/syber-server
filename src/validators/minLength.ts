import { Utilities } from '../utilities/utilities'

export function MinLength(whereToLook: any, whatToLookFor: any): Boolean {

    const options = Utilities.isObject(whatToLookFor) ? whatToLookFor : {min: whatToLookFor}

    if (!whereToLook || !options.min && options.min !== 0) {
        return false
    }
    if (!Utilities.isString(whereToLook)) whereToLook = whereToLook.toString()
    if (!Utilities.isNumber(options.min)) return false

    return whereToLook.length >= options.min

}
