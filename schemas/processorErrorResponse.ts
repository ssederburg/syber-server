export class ProcessorErrorResponse {
    source: string = 'unknown'
    successful?: boolean = false
    message?: string = null
    httpStatus?: number = 500
    data?: any = {}
    err: any = {}
}
