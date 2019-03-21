export declare enum SyberServerEvents {
    ServerStarting = "server-starting",
    ServerStarted = "server-started",
    ServerStopping = "server-stopping",
    ServerStopped = "server-stopped",
    GlobalSchematicError = "global-schematic-error",
    BeginRequest = "begin-request",
    RouteHandlerException = "route-handler-exception",
    ExecutionContextBeforeLoadParameters = "execution-context-before-load-parameters",
    ExecutionContextAfterLoadParameters = "execution-context-after-load-parameters",
    ActivityStarted = "activity-started",
    ActivityEnded = "activity-ended",
    ProcessorStarted = "processor-started",
    ProcessorEnded = "processor-ended",
    EndRequest = "end-request"
}
