"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SyberServerEvents;
(function (SyberServerEvents) {
    SyberServerEvents["ServerStarting"] = "server-starting";
    SyberServerEvents["ServerStarted"] = "server-started";
    SyberServerEvents["ServerStopping"] = "server-stopping";
    SyberServerEvents["ServerStopped"] = "server-stopped";
    SyberServerEvents["GlobalSchematicError"] = "global-schematic-error";
    SyberServerEvents["BeginRequest"] = "begin-request";
    SyberServerEvents["RouteHandlerException"] = "route-handler-exception";
    SyberServerEvents["ExecutionContextBeforeLoadParameters"] = "execution-context-before-load-parameters";
    SyberServerEvents["ExecutionContextAfterLoadParameters"] = "execution-context-after-load-parameters";
    SyberServerEvents["ActivityStarted"] = "activity-started";
    SyberServerEvents["ActivityEnded"] = "activity-ended";
    SyberServerEvents["ProcessorStarted"] = "processor-started";
    SyberServerEvents["ProcessorEnded"] = "processor-ended";
    SyberServerEvents["EndRequest"] = "end-request";
})(SyberServerEvents = exports.SyberServerEvents || (exports.SyberServerEvents = {}));
