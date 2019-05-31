import { Utilities } from '../utilities/utilities'
import { Min, Max } from '../validators'

export function Range(whereToLook: any, whatToLookFor: any): boolean {

    const options = Utilities.isObject(whatToLookFor) ? whatToLookFor : null
    
    if (!options) {
        return false
    }

    if (!options.max && options.max !== 0) {
        return false
    }
    if (!options.min && options.min !== 0) {
        return false
    }

    if (!Utilities.isNumber(options.min) || !Utilities.isNumber(options.max) || !Utilities.isNumber(whereToLook)) {
        return false
    }

    return Min(whereToLook, options.min) && Max(whereToLook, options.max)

}
