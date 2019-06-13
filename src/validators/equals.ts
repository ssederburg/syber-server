import { Utilities } from '../utilities/utilities'

// Read as: Does whereToLook Equal whatToLookFor?
// whatToLookFor: { value: x, ignoreCase: true|false, trim: true|false }

export function Equals(whereToLook: any, whatToLookFor: any): boolean {
    
    const options = Utilities.isObject(whatToLookFor) ? Object.assign({}, whatToLookFor) : {value: whatToLookFor, ignoreCase: false, trim: false}

    if (!whereToLook || !options.value) return false

    if (!Utilities.isString(options.value)) options.value = options.value.toString()
    if (!Utilities.isString(whereToLook)) whereToLook = whereToLook.toString()

    if (options.ignoreCase) {
        options.value = options.value.toLowerCase()
        whereToLook = whereToLook.toLowerCase()
    }

    if (options.trim) {
        options.value = options.value.replace(/\s/g, '')
        whereToLook = whereToLook.replace(/\s/g, '')
    }

    return whereToLook === options.value
    
}
