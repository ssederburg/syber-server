import { Utilities } from '../utilities/utilities'
import { IsFloatOptions } from '../schemas'

export function IsFloat(whereToLook: string, whatToLookFor?: IsFloatOptions): boolean {

    if (!whereToLook) return false

    if (whereToLook === null || whereToLook === undefined) return false
    let theChar = '.'
    if (whatToLookFor && whatToLookFor.decimalChar) {
        theChar = whatToLookFor.decimalChar
    }

    const localNumberText = whereToLook.replace(theChar, '.')
    try {
        if (Utilities.isNumber(localNumberText) && !isNaN(parseFloat(localNumberText)) && whereToLook.indexOf(theChar) >= 0) {
            if (whatToLookFor) {
                // Requested explicit handling of validation of this float through options
                if (whatToLookFor.precision && whereToLook.length - 1 !== whatToLookFor.precision) {
                    return false
                }
                if (whatToLookFor.maxPrecision && whereToLook.length - 1 > whatToLookFor.maxPrecision) {
                    return false
                }
                if (whatToLookFor.minPrecision && whereToLook.length - 1 < whatToLookFor.minPrecision) {
                    return false
                }
                if (whatToLookFor.scale || whatToLookFor.minScale || whatToLookFor.maxScale) {
                    const decimals = whereToLook.substr(whereToLook.indexOf(theChar) + 1)
                    if (whatToLookFor.scale && decimals.length !== whatToLookFor.scale) {
                        return false
                    }
                    if (whatToLookFor.maxScale && decimals.length > whatToLookFor.maxScale) {
                        return false
                    }
                    if (whatToLookFor.minScale && decimals.length < whatToLookFor.minScale) {
                        return false
                    }
                }
            }
            return true
        }
        return false    
    } catch {
        return false
    }
}
