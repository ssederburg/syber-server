import { Utilities } from '../utilities/utilities'
import { Min, Max } from '../validators'

export function Range(whereToLook: any, whatToLookFor: any): Boolean {

    const options = Utilities.isObject(whatToLookFor) ? whatToLookFor : null
    if (!options || !options.max || !options.min) {
        return false
    }

    if (!Utilities.isNumber(options.min) || !Utilities.isNumber(options.max) || !Utilities.isNumber(whereToLook)) {
        return false
    }

    return Min(whereToLook, options.min) && Max(whereToLook, options.max)

}
