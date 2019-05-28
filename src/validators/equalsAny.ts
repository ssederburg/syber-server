import { Utilities } from '../utilities/utilities'

// READ AS "Does whereToLook Equal Any items in whatToLookFor?"
// "Does field value '$123.00' equal either ['USD123.00','$123.00']"
// whatToLookFor: { value: [x], ignoreCase: true|false, trim: true|false }

export function EqualsAny(whereToLook: any, whatToLookFor: Array<any>|any): Boolean {
    
    const options = Utilities.isArray(whatToLookFor) ? {value: whatToLookFor, ignoreCase: false, trim: false} : Object.assign({}, whatToLookFor)
    
    if (!whereToLook || !options || !options.value || !Utilities.isArray(options.value)) {
        return false
    }

    if (!Utilities.isString(whereToLook)) whereToLook = whereToLook.toString()
    
    if (options.ignoreCase) {
        whereToLook = whereToLook.toLowerCase()
    }
    if (options.trim) {
        whereToLook = whereToLook.replace(/\s/g, '')
    }

    let wasOne = false
    options.value.forEach((item) => {
        if (options.ignoreCase) {
            item = item.toLowerCase()
        }
        if (options.trim) {
            item = item.replace(/\s/g, '')
        }
        if (!wasOne && whereToLook === item) {
            wasOne = true
            return true
        }
    })
    return wasOne
    
}
