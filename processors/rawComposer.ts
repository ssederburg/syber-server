import { ProcessorResponse, ProcessorErrorResponse } from '../schemas'
import { BaseProcessor } from '../processors'

export class RawComposer extends BaseProcessor {

    fx(): Promise<ProcessorResponse|ProcessorErrorResponse> {

        const result: Promise<ProcessorResponse|ProcessorErrorResponse> = new Promise((resolve, reject) => {
            try {
                this.executionContext.raw = Object.assign({}, this.executionContext.raw, this.processorDef.args)
                return resolve({
                    successful: true
                })
            }
            catch (err) {
                return reject(this.handleError(err, 'RawComposer'))
            }
        })

        return result

    }

}