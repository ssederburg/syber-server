import { Utilities } from '../utilities/utilities'

// READ AS "Does whereToLook Contain Any items in whatToLookFor?"
// "Does field value '$123.00' have either ['$','USD']"
// whatToLookFor: { value: [x], ignoreCase: true|false }

export function ContainsAny(whereToLook: any, whatToLookFor: Array<any>|any): boolean {
    
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
        if (!wasOne && whereToLook.indexOf(item) >= 0) {
            wasOne = true
            return true
        }
    })
    return wasOne
    
}
