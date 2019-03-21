import { Utilities } from '../utilities/utilities'

export function StartsWithAny(text: Array<string>, value?: any): Boolean {
    if (!Utilities.isString(value)) value = value.toString()
    let wasOne = false
    text.forEach((item) => {
        if (!wasOne && value.indexOf(item)===0) wasOne = true
    })
    return wasOne
}
