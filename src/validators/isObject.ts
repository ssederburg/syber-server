import { Utilities } from '../utilities/utilities'

export function IsObject(value?: any): Boolean {
    if (!value) {
        return false
    }
    return Utilities.isObject(value)
}
