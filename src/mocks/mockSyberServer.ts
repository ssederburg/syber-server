import { ILogger, SchematicResponse } from '../schemas'
import { IMockSyberServer } from './'
import { EventEmitter } from 'events'
import { Logger } from '../utilities'
import { RawResponse } from '../responses'

export class MockSyberServer implements IMockSyberServer {

    public events: EventEmitter = new EventEmitter()
    public logger: ILogger = new Logger()
    public getGlobalSchematicResponse(httpStatus: number): SchematicResponse {

        return {
            httpStatus,
            class: RawResponse
        }

    }

}