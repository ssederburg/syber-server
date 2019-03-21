const env = require("dotenv").config()

import * as Express from 'express'

const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const EventEmitter = require('events')

import {SyberServerEvents} from './events'
import {RouteHandler, RouteOptions} from './routes'
import {GlobalSchematic} from './schematics'
import {SyberServerOptions} from './syberServerOptions'
import * as _ from 'lodash'
import * as config from 'config'
import { RequestContext, SchematicResponse } from './schemas'
import { ExecutionContext } from './executionContext'
const uuidv4 = require('uuid/v4')
const swaggerUi = require('swagger-ui-express')

export class SyberServer {

    private server = null
    private isStarted: boolean = false
    private shuttingDown: boolean = false
    private globalSchematic: typeof GlobalSchematic = null
    private sharedResources: Array<any> = []
    
    public events = new EventEmitter()

    constructor (private options: SyberServerOptions) {
        this.server = express()
        this.server.use(helmet())
        
        this.server.use(bodyParser.json())

        this.server.use((req, res, next) => {
            req.id = uuidv4()
            return next()
        })
    }

    public registerGlobalSchematic(schematic: typeof GlobalSchematic, sharedResources: Array<any> = []) {
        this.globalSchematic = schematic
        this.sharedResources = sharedResources
    }

    public registerHandler(verb: string, path: string, handler: any) {
        if (!this.server[verb]) {
            console.warn(`Attempted to Register Handler for verb ${verb} @ ${path}. Unknown verb. Handler registration ignored...`)
            return
        }

        this.server[verb](path, (req: RequestContext, res: Express.Response, next: Express.NextFunction) => {
            return handler(req, res, next)
        })
    }

    public registerRoute(options: RouteOptions) {
        
        if (this.isStarted) {
            console.error(`Attempted to SyberServer.registerRoute after server started. Route Registration ignored...`)
            return
        }

        const routeHandler = new RouteHandler(this)
        routeHandler.register(this.server, options)

    }

    public start() {

        if (this.isStarted) return
        this.isStarted = true

        this.events.emit(SyberServerEvents.ServerStarting, {
            source: `SyberServer`,
            correlationId: `SYSTEM`
        })

        // Setup Static Assets as last Route Handler before 404 or 500
        if (this.options.staticPath) {
            if (this.options.baseHref) {
                // Create a virtual path prefix
                // files accessed with path /staticBaseHref/staticPath
                // example of staticBaseHref should start with / e.g. /static
                this.server.use(this.options.baseHref, express.static(this.options.staticPath))
            } else {
                // Use a relative path without virtual path prefix
                // files access with path /staticPath
                this.server.use(express.static(this.options.staticPath))
            }
        }
        
        console.log(`Loading swagger from ${process.cwd() + '/swagger.json'}`)
        const swaggerDocument = require(process.cwd() + '/swagger.json')

        this.server.use('/swagger.io', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

        this.server.use(async(err, req, res, next) => {
            if (err) {
                if (res.headersSent) {
                    return
                }
                const response = await this.throwGlobalSchematicError(req, 500, `Unhandled Exception in service: ${req.path}: ${err}`)
                return res.status(500).json(response)
            }
            next(err)
        })

        this.server.use(async(req, res, next) => {
            // TODO: If not XHR, Assume HTML5 Mode URL and return root SPA page
            if (this.options.staticPath && !req.XHR && req.verb === 'GET') {
                
            }
            const response = await this.throwGlobalSchematicError(req, 404, `Unable to locate path ${req.path}`)
            return res.status(404).json(response)
        })

        this.server.listen(this.options.port, err => {
            if (err) throw err

            process.on('SIGTERM', () => {
                this.shutdown()
            })

            process.on('exit', () => {
                this.shutdown()
            })

            process.on('SIGINT', () => {
                this.shutdown()
            })

            process.on('uncaughtException', (err) => {
                console.error(`UncaughtException in SyberServer`)
                console.error(JSON.stringify(err, null, 1))
                this.shutdown(true) // With Failure option means process.exit(1)
            })

            this.events.emit(SyberServerEvents.ServerStarted, {
                source: `SyberServer`,
                correlationId: `SYSTEM`,
                status: 0,
                message: 'Locked In'
            })
            console.log(`\nServer listening on http://localhost:${this.options.port}\n`)
        })

    }

    public shutdown(withError: boolean = false) {

        if (this.shuttingDown) return
        this.shuttingDown = true

        this.events.emit(SyberServerEvents.ServerStopping, {
            source: `SyberServer`,
            correlationId: `SYSTEM`
        })
        
        // TODO: Call Shutdown on all routes
        this.events.emit(SyberServerEvents.ServerStopped, {
            source: `SyberServer`,
            correlationId: `SYSTEM`
        })
        process.exit(withError ? 1 : 0)

    }

    public getGlobalSchematicResponse(httpStatus: number): SchematicResponse {

        if (!this.globalSchematic) return null
        const global = new this.globalSchematic()
        const test = _.find(global.responses, { httpStatus: httpStatus })
        if (test) {
            return test
        }
        // Finally Search for default wildcard of 0
        const lastChance = _.find(global.responses, { httpStatus: 0 })
        if (lastChance) {
            return lastChance
        }
        return null

    }

    public throwGlobalSchematicError(req: RequestContext, httpStatus: number, errText: string): Promise<any> {

        const result = new Promise(async(resolve, reject) => {
            try {
                const executionContext = new ExecutionContext(req, new this.globalSchematic(), this.sharedResources, this)
                executionContext.httpStatus = httpStatus
                executionContext.raw = errText
                executionContext.errors.push(errText)
                const response = await executionContext.execute()
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
                })
                return resolve(response)
            }
            catch (err) {
                // TODO: What do we do with rejections from GlobalExecutionContext execution?
                return resolve()
            }    
        })

        return result

    }
}

