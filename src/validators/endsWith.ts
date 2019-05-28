import { Utilities } from '../utilities/utilities'

// Read as: Does whereToLook End With whatToLookFor?
// whatToLookFor: { value: x, ignoreCase: true|false }

export function EndsWith(whereToLook: any, whatToLookFor: any): Boolean {
    
    const options = Utilities.isObject(whatToLookFor) ? whatToLookFor : {value: whatToLookFor, ignoreCase: false}

    if (!whereToLook || !options.value) return false

    if (!Utilities.isString(options.value)) options.value = options.value.toString()
    if (!Utilities.isString(whereToLook)) whereToLook = whereToLook.toString()

    if (whereToLook.length < whatToLookFor.length) return false

    if (options.ignoreCase) {
        options.value = options.value.toLowerCase()
        whereToLook = whereToLook.toLowerCase()
    }

    return whereToLook.substr(whereToLook.length - options.value.length) === options.value
    
}
