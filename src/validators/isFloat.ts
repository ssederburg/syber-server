import { Utilities } from '../utilities/utilities'

export function IsFloat(value?: any): Boolean {
    return Utilities.isNumber && value.toString().indexOf('.') >= 0
}
