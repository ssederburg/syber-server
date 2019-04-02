import { ProcessorResponse, ProcessorErrorResponse } from './'
import { BaseProcessor } from '../processors'

export class ErrorResponse extends BaseProcessor {

    fx(): Promise<ProcessorResponse|ProcessorErrorResponse> {

        const result: Promise<ProcessorResponse|ProcessorErrorResponse> = new Promise((resolve, reject) => {

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
                reject(this.handleError(err, 'ErrorResponse'))
            }

        })

        return result

    }

}