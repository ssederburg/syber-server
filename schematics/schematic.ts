import { Parameter, Activity, SchematicResponse } from '../schemas'

export class Schematic {
    id: string
    description: string
    parameters?: Array<Parameter> = []
    timeout?: number = 5000
    activities: Array<Activity> = []
    responses: Array<SchematicResponse> = []
    resources?: Array<any> = []
}
// initialize
// shared resources
// health check
// preconditions
// tests
// shutdown

// correlation id
// authenticate
// authorize
// user context

// activities (execution model = sequential or concurrent, ordinal)
//  nested activities (execution model = sequential or concurrent, ordinal)

// validators
// composers
// transforms
/*
    converter
    segregator
    aggregator
    group
    unique
    filter
    find
    pager
    sorter
    translator
    mask
    formatter
    lookup
    formulator
    calculator
*/
// functions
// maps
// actions
// responses
// errors

// schemas
// cache
// rules
