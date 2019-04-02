var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const env = require("dotenv").config();
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const EventEmitter = require('events');
import { SyberServerEvents } from './events';
import { RouteHandler } from './routes';
import * as _ from 'lodash';
import { ExecutionContext } from './executionContext';
import { Logger } from './utilities';
const uuidv4 = require('uuid/v4');
const swaggerUi = require('swagger-ui-express');
export class SyberServer {
    constructor(options) {
        this.options = options;
        this.isStarted = false;
        this.shuttingDown = false;
        this.globalSchematic = null;
        this.sharedResources = [];
        this.logger = null;
        this.events = new EventEmitter();
        this.express = null;
        this.logger = options.logger ? options.logger : new Logger();
        this.express = express();
        this.express.use(helmet());
        this.express.use(bodyParser.json());
        this.express.use((req, res, next) => {
            req.id = uuidv4();
            return next();
        });
    }
    registerGlobalSchematic(schematic, sharedResources = []) {
        this.globalSchematic = schematic;
        this.sharedResources = sharedResources;
    }
    registerHandler(verb, path, handler) {
        if (!this.express[verb]) {
            this.logger.warn(`SYS${uuidv4()}`, `Attempted to Register Handler for verb ${verb} @ ${path}. Unknown verb. Handler registration ignored...`, `syberServer.registerHandler`);
            return;
        }
        this.express[verb](path, (req, res, next) => {
            return handler(req, res, next);
        });
    }
    registerRoute(options) {
        if (this.isStarted) {
            this.logger.error(`SYS${uuidv4()}`, `Attempted to SyberServer.registerRoute after server started. Route Registration ignored...`, `syberServer.registerRoute`);
            return;
        }
        const routeHandler = new RouteHandler(this);
        routeHandler.register(this.express, options);
    }
    start() {
        if (this.isStarted)
            return;
        this.isStarted = true;
        this.events.emit(SyberServerEvents.ServerStarting, {
            source: `SyberServer`,
            correlationId: `SYSTEM`
        });
        if (this.options.staticPath) {
            if (this.options.baseHref) {
                this.express.use(this.options.baseHref, express.static(this.options.staticPath));
            }
            else {
                this.express.use(express.static(this.options.staticPath));
            }
        }
        this.logger.log(`SYS${uuidv4()}`, `Loading swagger from ${process.cwd() + '/swagger.json'}`, `syberServer.start`);
        const swaggerDocument = require(process.cwd() + '/swagger.json');
        this.express.use('/swagger.io', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        this.express.use((err, req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                if (res.headersSent) {
                    return;
                }
                const response = yield this.throwGlobalSchematicError(req, 500, `Unhandled Exception in service: ${req.path}: ${err}`);
                return res.status(500).json(response);
            }
            next(err);
        }));
        this.express.use((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (this.options.staticPath && !req.XHR && req.verb === 'GET') {
            }
            const response = yield this.throwGlobalSchematicError(req, 404, `Unable to locate path ${req.path}`);
            return res.status(404).json(response);
        }));
        this.express.listen(this.options.port, err => {
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
                const errorId = uuidv4();
                this.logger.error(`SYS${errorId}`, `UncaughtException in SyberServer`, `syberServer.start.uncaughtException`);
                this.logger.error(`SYS${errorId}`, `${err.message}`, `syberServer.start.uncaughtException`);
                this.shutdown(true);
            });
            this.events.emit(SyberServerEvents.ServerStarted, {
                source: `SyberServer`,
                correlationId: `SYSTEM`,
                status: 0,
                message: 'Locked In'
            });
            this.logger.log(`SYS${uuidv4()}`, `\nServer listening on port:${this.options.port}\n`, `syberServer.start`);
        });
    }
    shutdown(withError = false) {
        if (this.shuttingDown)
            return;
        this.shuttingDown = true;
        this.events.emit(SyberServerEvents.ServerStopping, {
            source: `SyberServer`,
            correlationId: `SYSTEM`
        });
        this.events.emit(SyberServerEvents.ServerStopped, {
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
                const executionContext = new ExecutionContext(req, new this.globalSchematic(), this.sharedResources, this);
                executionContext.httpStatus = httpStatus;
                executionContext.document = errText;
                executionContext.errors.push(errText);
                const response = yield executionContext.execute();
                this.events.emit(SyberServerEvents.GlobalSchematicError, {
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
