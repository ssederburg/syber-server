import { ProcessorResponse, ProcessorErrorResponse } from '../responses'
import { BaseProcessor } from '../processors'

export class FieldComposer extends BaseProcessor {

    fx(): Promise<ProcessorResponse|ProcessorErrorResponse> {

        const result: Promise<ProcessorResponse|ProcessorErrorResponse> = new Promise((resolve, reject) => {
            try {
                const output = {}
                if (!this.executionContext.schematic.parameters || this.executionContext.schematic.parameters.length <= 0) {
                    return resolve({
                        successful: false,
                        message: `No parameters listed in schematic`
                    })
                }
                this.executionContext.schematic.parameters.forEach((parameter) => {
                    output[parameter.name] = this.executionContext.getParameterValue(parameter.name)
                })
                this.executionContext.raw = Object.assign({}, output)
                return resolve({
                    successful: true
                })
            }
            catch (err) {
                return reject(this.handleError(err, 'FieldComposer'))
            }
        })

        return result

    }

}