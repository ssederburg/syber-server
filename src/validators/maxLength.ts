import { Utilities } from '../utilities/utilities'

export function MaxLength(whereToLook: any, whatToLookFor: any): boolean {

    const options = Utilities.isObject(whatToLookFor) ? whatToLookFor : {max: whatToLookFor}

    if (!whereToLook || !options.max && options.max !== 0) {
        return false
    }
    if (!Utilities.isString(whereToLook)) whereToLook = whereToLook.toString()
    if (!Utilities.isNumber(options.max)) return false

    return whereToLook.length <= options.max

}
