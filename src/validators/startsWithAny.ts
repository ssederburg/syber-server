import { Utilities } from '../utilities/utilities'

// READ AS "Does whereToLook Start With Any items in whatToLookFor?"
// "Does field value '$123.00' start with either ['$','.USD']"
// whatToLookFor: { value: [x], ignoreCase: true|false }

export function StartsWithAny(whereToLook: any, whatToLookFor: Array<any>|any): boolean {
    
    const options = Utilities.isArray(whatToLookFor) ? {value: whatToLookFor, ignoreCase: false} : Object.assign({}, whatToLookFor)

    if (!whereToLook || !options || !options.value || !Utilities.isArray(options.value)) {
        return false
    }

    if (!Utilities.isString(whereToLook)) whereToLook = whereToLook.toString()
    
    if (options.ignoreCase) {
        whereToLook = whereToLook.toLowerCase()
    }

    let wasOne = false
    options.value.forEach((item) => {
        if (options.ignoreCase) {
            item = item.toLowerCase()
        }
        if (!wasOne && whereToLook.substr(0, item.length) === item) {
            wasOne = true
            return true
        }
    })
    return wasOne

}
