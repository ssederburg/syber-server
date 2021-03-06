import { ProcessorResponse, ProcessorErrorResponse } from '../responses'
import { BaseProcessor } from '../processors'

export class RawResponse extends BaseProcessor {

    fx(): Promise<ProcessorResponse|ProcessorErrorResponse> {

        const result: Promise<ProcessorResponse|ProcessorErrorResponse> = new Promise((resolve, reject) => {

            try {
                return resolve({
                    successful: true,
                    message: 'OK',
                    data: Object.assign({}, this.executionContext.document)
                })
            }
            catch (err) {
                reject(this.handleError(err, 'RawResponse'))
            }

        })

        return result

    }

}