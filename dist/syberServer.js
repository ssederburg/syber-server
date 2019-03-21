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
const env = require("dotenv").config();
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const EventEmitter = require('events');
const events_1 = require("./events");
const routes_1 = require("./routes");
const _ = require("lodash");
const executionContext_1 = require("./executionContext");
const uuidv4 = require('uuid/v4');
const swaggerUi = require('swagger-ui-express');
class SyberServer {
    constructor(options) {
        this.options = options;
        this.server = null;
        this.isStarted = false;
        this.shuttingDown = false;
        this.globalSchematic = null;
        this.sharedResources = [];
        this.events = new EventEmitter();
        this.server = express();
        this.server.use(helmet());
        this.server.use(bodyParser.json());
        this.server.use((req, res, next) => {
            req.id = uuidv4();
            return next();
        });
    }
    registerGlobalSchematic(schematic, sharedResources = []) {
        this.globalSchematic = schematic;
        this.sharedResources = sharedResources;
    }
    registerHandler(verb, path, handler) {
        if (!this.server[verb]) {
            console.warn(`Attempted to Register Handler for verb ${verb} @ ${path}. Unknown verb. Handler registration ignored...`);
            return;
        }
        this.server[verb](path, (req, res, next) => {
            return handler(req, res, next);
        });
    }
    registerRoute(options) {
        if (this.isStarted) {
            console.error(`Attempted to SyberServer.registerRoute after server started. Route Registration ignored...`);
            return;
        }
        const routeHandler = new routes_1.RouteHandler(this);
        routeHandler.register(this.server, options);
    }
    start() {
        if (this.isStarted)
            return;
        this.isStarted = true;
        this.events.emit(events_1.SyberServerEvents.ServerStarting, {
            source: `SyberServer`,
            correlationId: `SYSTEM`
        });
        if (this.options.staticPath) {
            if (this.options.baseHref) {
                this.server.use(this.options.baseHref, express.static(this.options.staticPath));
            }
            else {
                this.server.use(express.static(this.options.staticPath));
            }
        }
        console.log(`Loading swagger from ${process.cwd() + '/swagger.json'}`);
        const swaggerDocument = require(process.cwd() + '/swagger.json');
        this.server.use('/swagger.io', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        this.server.use((err, req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                if (res.headersSent) {
                    return;
                }
                const response = yield this.throwGlobalSchematicError(req, 500, `Unhandled Exception in service: ${req.path}: ${err}`);
                return res.status(500).json(response);
            }
            next(err);
        }));
        this.server.use((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (this.options.staticPath && !req.XHR && req.verb === 'GET') {
            }
            const response = yield this.throwGlobalSchematicError(req, 404, `Unable to locate path ${req.path}`);
            return res.status(404).json(response);
        }));
        this.server.listen(this.options.port, err => {
            if (err)
                throw err;
            process.on('SIGTERM', () => {
                this.shutdown();
            });
            process.on('exit', () => {
                this.shutdown();
            });
            process.on('SIGINT', () => {
                this.shutdown();
            });
            process.on('uncaughtException', (err) => {
                console.error(`UncaughtException in SyberServer`);
                console.error(JSON.stringify(err, null, 1));
                this.shutdown(true);
            });
            this.events.emit(events_1.SyberServerEvents.ServerStarted, {
                source: `SyberServer`,
                correlationId: `SYSTEM`,
                status: 0,
                message: 'Locked In'
            });
            console.log(`\nServer listening on http://localhost:${this.options.port}\n`);
        });
    }
    shutdown(withError = false) {
        if (this.shuttingDown)
            return;
        this.shuttingDown = true;
        this.events.emit(events_1.SyberServerEvents.ServerStopping, {
            source: `SyberServer`,
            correlationId: `SYSTEM`
        });
        this.events.emit(events_1.SyberServerEvents.ServerStopped, {
            source: `SyberServer`,
            correlationId: `SYSTEM`
        });
        process.exit(withError ? 1 : 0);
    }
    getGlobalSchematicResponse(httpStatus) {
        if (!this.globalSchematic)
            return null;
        const global = new this.globalSchematic();
        const test = _.find(global.responses, { httpStatus: httpStatus });
        if (test) {
            return test;
        }
        const lastChance = _.find(global.responses, { httpStatus: 0 });
        if (lastChance) {
            return lastChance;
        }
        return null;
    }
    throwGlobalSchematicError(req, httpStatus, errText) {
        const result = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const executionContext = new executionContext_1.ExecutionContext(req, new this.globalSchematic(), this.sharedResources, this);
                executionContext.httpStatus = httpStatus;
                executionContext.raw = errText;
                executionContext.errors.push(errText);
                const response = yield executionContext.execute();
                this.events.emit(events_1.SyberServerEvents.GlobalSchematicError, {
                    source: `SyberServer.throwGlobalSchematicError`,
                    correlationId: req.id,
                    path: req.path,
                    method: req.method,
                    body: req.body,
                    params: req.params,
                    query: req.query,
                    httpStatus: httpStatus,
                    message: errText
                });
                return resolve(response);
            }
            catch (err) {
                return resolve();
            }
        }));
        return result;
    }
}
exports.SyberServer = SyberServer;
