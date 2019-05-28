import { Utilities } from '../utilities/utilities'

export function IsFloat(value: string): Boolean {
    if (value === null || value === undefined) return false

    if (Utilities.isNumber(value) && !isNaN(parseFloat(value)) && value.indexOf('.') >= 0) {
        return true
    }
    return false
}
