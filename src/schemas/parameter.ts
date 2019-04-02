export class Parameter {
    name: string
    source: string
    value?: string
    description?: string
    required?: boolean = false
    dataType?: string = 'string'
    validators?: Array<any> = []
    isValid?: boolean = true
    whiteList?: Array<any> = []
    blackList?: Array<any> = []
}
