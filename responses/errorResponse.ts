import { BaseProcessor, ProcessorResponse } from '../schemas'

export class ErrorResponse extends BaseProcessor {

    fx(args: any): Promise<ProcessorResponse> {

        const result: Promise<ProcessorResponse> = new Promise((resolve, reject) => {

            try {
                return resolve({
                    successful: false,
                    message: 'ERROR',
                    data: Object.assign({}, {
                        httpStatus: this.executionContext.httpStatus,
                        errors: this.executionContext.errors,
                        warnings: this.executionContext.warnings,
                        origin: `ErrorResponse.Resolve`
                    })
                })
            }
            catch (err) {
                reject({
                    successful: false,
                    message: 'ERROR',
                    data: Object.assign({}, {
                        httpStatus: this.executionContext.httpStatus || 500,
                        errors: this.executionContext.errors || ['Unknown Error'],
                        warnings: this.executionContext.warnings || [],
                        origin: `ErrorResponse.Reject`
                    })
                })
            }

        })

        return result

    }

}