/// <reference types="node" />
import { EventEmitter } from 'events';
import { IEventEmitter, ILogger, SchematicResponse } from '../schemas';
export interface IMockSyberServer {
    events: EventEmitter | IEventEmitter;
    logger: ILogger;
    getGlobalSchematicResponse(httpStatus: number): SchematicResponse;
}
