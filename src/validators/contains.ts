import { Utilities } from '../utilities/utilities'

// Read as: Does whereToLook Contain whatToLookFor
// whatToLookFor: { value: x, ignoreCase: true|false }

export function Contains(whereToLook: any, whatToLookFor: any): boolean {
    
    const options = Utilities.isObject(whatToLookFor) ? Object.assign({}, whatToLookFor) : {value: whatToLookFor, ignoreCase: false}

    if (!whereToLook || !options.value) return false

    if (!Utilities.isString(options.value)) options.value = options.value.toString()
    if (!Utilities.isString(whereToLook)) whereToLook = whereToLook.toString()

    if (options.ignoreCase) {
        options.value = options.value.toLowerCase()
        whereToLook = whereToLook.toLowerCase()
    }

    return whereToLook.indexOf(options.value) >= 0
    
}
