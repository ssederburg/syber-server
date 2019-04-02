import { ProcessorResponse, ProcessorErrorResponse } from '../responses'
import { BaseProcessor } from '../processors'

export class HttpStatusResponse extends BaseProcessor {

    fx(): Promise<ProcessorResponse|ProcessorErrorResponse> {

        const result: Promise<ProcessorResponse|ProcessorErrorResponse> = new Promise((resolve, reject) => {

            try {
                if (!this.processorDef || !this.processorDef.args || !this.processorDef.args.httpStatus) {
                    this.logger.warn(this.executionContext.correlationId, `Attempted to use HttpStatusResponse without setting argument for httpStatus in processor definition element`, `httpStatusResponse.fx`)
                    this.processorDef.args = {
                        httpStatus: 200
                    }
                }
                return resolve({
                    successful: true,
                    message: 'OK',
                    httpStatus: this.processorDef.args.httpStatus || 200,
                    data: null
                })
            }
            catch (err) {
                reject(this.handleError(err, 'HttpStatusResponse'))
            }

        })

        return result

    }

}