import { Utilities } from '../utilities/utilities'

export function Length(len: number, value?: any): Boolean {
    if (!Utilities.isString(value)) value = value.toString()
    return value.length === len
}
