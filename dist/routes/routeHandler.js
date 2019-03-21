"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const executionContext_1 = require("../executionContext");
const utilities_1 = require("../utilities/utilities");
const events_1 = require("../events");
class RouteHandler {
    constructor(syberServer) {
        this.syberServer = syberServer;
    }
    register(server, options) {
        if (!options.verb) {
            console.warn(`Attempted to register route @${options.path} contained null verb. Route ignored...`);
            return;
        }
        options.verb = options.verb.toLowerCase();
        if (!server[options.verb]) {
            console.warn(`Attempted to register route @${options.path} for unrecognized verb ${options.verb}. Route ignored...`);
            return;
        }
        server[options.verb](options.path, (req, res, next) => {
            const requestContext = req;
            return this.execute(server, options, requestContext, res, next);
        });
    }
    execute(server, options, req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (options.useResolver && options.resolve) {
                const testResult = yield options.resolve(req);
                if (testResult) {
                    options.schematic = testResult;
                }
            }
            if (!options.schematic) {
                console.log(`Attempted to execute route ${req.path} without a valid schematic. Route ignored.`);
                const response = yield this.throwError(req, 400, `Invalid Request. Missing Schematic.`, options, next);
                return res.status(400).json(response);
            }
            let execContext;
            try {
                const schematicInstance = new options.schematic();
                const timer = setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    if (res.headersSent)
                        return;
                    console.log(`Timeout exceeded on path ${req.path}`);
                    req.timedout = true;
                    execContext.httpStatus = 408;
                    const response = yield this.throwError(req, 408, `Request Timed Out.`, options, next);
                    return res.status(408).json(response);
                }), schematicInstance.timeout || 5000);
                execContext = new executionContext_1.ExecutionContext(req, schematicInstance, options.sharedResources || [], this.syberServer);
                if (req.timedout)
                    return;
                yield this.beforeEachExecution(server, options, req, res);
                if (req.timedout)
                    return;
                const result = yield execContext.execute();
                res.status(execContext.httpStatus).json(result);
                clearTimeout(timer);
                if (req.timedout)
                    return;
                this.afterEachExecution(server, options, req, res, next);
            }
            catch (err) {
                if (res.headersSent)
                    return;
                if (!utilities_1.Utilities.isString(err)) {
                    const httpStatus = execContext.httpStatus === 200 ? 500 : execContext.httpStatus;
                    const endTime = new Date();
                    const runtime = Math.abs(+endTime - +req.starttime) / 1000;
                    this.syberServer.events.emit(events_1.SyberServerEvents.RouteHandlerException, {
                        source: `RouteHandler.execute.catch`,
                        correlationId: req.id,
                        body: req.body,
                        method: req.method,
                        params: req.params,
                        path: req.path,
                        query: req.query,
                        err: Object.assign({}, err),
                        httpStatus: httpStatus,
                        starttime: req.starttime,
                        endtime: endTime,
                        runtime: runtime,
                        ip: req.ip
                    });
                    return res.status(httpStatus).json(err);
                }
                const message = err.message;
                let httpStatus = err.indexOf('timeout') >= 0 ? 408 : execContext.httpStatus;
                if (httpStatus === 200)
                    httpStatus = 500;
                const response = yield this.throwError(req, httpStatus, message, options, next);
                return res.status(httpStatus).json(response);
            }
        });
    }
    beforeEachExecution(server, options, req, res) {
        const startTime = new Date();
        req.starttime = startTime;
        this.syberServer.events.emit(events_1.SyberServerEvents.BeginRequest, {
            source: `RouteHandler.beforeEachExecution`,
            correlationId: req.id,
            body: req.body,
            method: req.method,
            params: req.params,
            path: req.path,
            query: req.query,
            starttime: startTime,
            ip: req.ip
        });
        return Promise.resolve(true);
    }
    afterEachExecution(server, options, req, res, next) {
        const endTime = new Date();
        const runtime = Math.abs(+endTime - +req.starttime) / 1000;
        this.syberServer.events.emit(events_1.SyberServerEvents.EndRequest, {
            source: `RouteHandler.afterEachExecution`,
            correlationId: req.id,
            body: req.body,
            method: req.method,
            params: req.params,
            path: req.path,
            query: req.query,
            starttime: req.starttime,
            endtime: endTime,
            runtime: runtime,
            ip: req.ip
        });
        if (!res.headersSent) {
            next();
            return Promise.resolve(true);
        }
        return Promise.resolve(true);
    }
    throwError(req, httpStatus, message, options, next) {
        const result = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.syberServer.throwGlobalSchematicError(req, httpStatus, message);
                return resolve(response);
            }
            catch (err) {
                return next(err);
            }
        }));
        return result;
    }
}
exports.RouteHandler = RouteHandler;
