import * as chai from 'chai'
import { AssertionError } from 'assert'
import { isNullOrUndefined } from 'util'

import { ExecutionContext, MockSyberServer, MockRequestContext, MockSchematic, 
    RawComposer, FieldComposer } from '../src'

const should = chai.should()
const expect = chai.expect

chai.use(require('chai-as-promised'))

describe('index tests work', () => {
    it ('should say true', () => {
        return Promise.resolve(true)
    })
})
// Reusable on every test
const mockSyberServer = new MockSyberServer()

// #region Basic Request Body Parameters
// Test Basic Processor
const mockRequestContextTest1 = new MockRequestContext({
    test: 'Hello World'
})
const mockSchematicTest1 = new MockSchematic([
    {
        name: 'test',
        source: 'req.body.test',
        required: true
    }
])
const mockExecutionContextTest1 = new ExecutionContext(mockRequestContextTest1, mockSchematicTest1, [], mockSyberServer)

describe('Basic Request Body Parameters', () => {
    it ('should return a value of Hello World', async() => {
        await mockExecutionContextTest1.setupForTesting()
        const mockProcessor = new FieldComposer(mockExecutionContextTest1, {
            class: FieldComposer
        }, mockSyberServer.logger)

        const result = new Promise(async(resolve, reject) => {
            try {
                const response = await mockProcessor.fx()
                if (!response) {
                    throw 'Invalid response from FieldComposer'
                }
                // Following console statements to help understand:
                //     The processor returns a processor response. Basically it's successful true or false
                //     The ExecutionContext's document property is where all processors usually put their updates
                //     We can read the contents of document at any time in the process to see if values are written properly
                //     This test does NOT use activities or run any workflow. It only demonstrates how to execute any processor
                if (response && response.successful) {
                    if (mockExecutionContextTest1.document && mockExecutionContextTest1.document.test) {
                        return resolve(true)
                    }
                }
                return reject(false)
            } catch (err) {
                return reject(err.message)
            }
        })

        return result
    })
})
// #endregion

