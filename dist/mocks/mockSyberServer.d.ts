/// <reference types="node" />
import { ILogger, SchematicResponse } from '../schemas';
import { IMockSyberServer } from './';
import { EventEmitter } from 'events';
export declare class MockSyberServer implements IMockSyberServer {
    events: EventEmitter;
    logger: ILogger;
    getGlobalSchematicResponse(httpStatus: number): SchematicResponse;
}
