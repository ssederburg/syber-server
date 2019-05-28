import { Utilities } from '../utilities/utilities'

// READ AS "Does whereToLook End With Any items in whatToLookFor?"
// "Does field value '$123.00' end with either ['.00','.0000']"
// whatToLookFor: { value: [x], ignoreCase: true|false }

export function EndsWithAny(whereToLook: any, whatToLookFor: Array<any>|any): Boolean {
    
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
        if (!wasOne && whereToLook.substr(whereToLook.length - item.length) === item) {
            wasOne = true
            return true
        }
    })
    return wasOne

}
