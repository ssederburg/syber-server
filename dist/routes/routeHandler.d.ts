import * as Express from 'express';
import { RouteOptions } from './';
export declare class RouteHandler {
    private syberServer;
    constructor(syberServer: any);
    register(server: Express.Application, options: RouteOptions): void;
    private execute;
    private beforeEachExecution;
    private afterEachExecution;
    private throwError;
}
