import * as chai from 'chai'
import { AssertionError } from 'assert'
import { isNullOrUndefined } from 'util'

import { ExecutionContext, MockSyberServer, MockRequestContext, MockSchematic, 
    RawComposer, FieldComposer, RuleEngineHelper, MockRuleProcessor, IRuleContainerSchema } from '../src'

const should = chai.should()
const expect = chai.expect

chai.use(require('chai-as-promised'))

class Tester {

    public async run() {

        // Reusable on every test
        const mockSyberServer = new MockSyberServer()

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
        const ruleEngineHelper = new RuleEngineHelper(mockSyberServer.logger)
        ruleEngineHelper.loadDefaultRuleFunctions()

        const mockExecutionContextTest1 = new ExecutionContext(
            mockRequestContextTest1, 
            mockSchematicTest1, 
            [{
                name: 'RuleEngineHelper',
                instanceOfType: ruleEngineHelper
            }], 
            mockSyberServer)

        await mockExecutionContextTest1.setupForTesting()

        const trial1: IRuleContainerSchema = {
            rules: [{
                className: 'IsNotNullOrEmpty',
                args: {trim: false, keywordMatch: false},
                ordinal: 0
            }],
            required: true,
            groups: []
        }

        describe('Rule Engine Tests: Trial 1 - Should not be null or empty', async() => {
            
            it (`Field Value: X should be true`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx('X', trial1)
                expect(response).not.null
                expect(response.successful).to.equal(true)
            
            })
            it (`Field Value: null should be false`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx(null, trial1)
                expect(response).not.null
                expect(response.successful).to.equal(false)

            })

        })

        const trial2: IRuleContainerSchema = {
            rules: [{
                className: 'IsNullOrEmpty',
                args: {trim: true, keywordMatch: true},
                ordinal: 0
            }],
            required: true,
            groups: []
        }

        describe('Rule Engine Tests: Trial 2 - Should be null or empty', async() => {
            
            it (`Field Value: X should be false`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx('X', trial2)
                expect(response).not.null
                expect(response.successful).to.equal(false)
            
            })
            it (`Field Value: null should be true`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx(null, trial2)
                expect(response).not.null
                expect(response.successful).to.equal(true)

            })

        })

        const trial3: IRuleContainerSchema = {
            rules: [{
                className: 'IsNumber',
                args: null,
                ordinal: 0,
                dataType: 'number'
            },{
                className: 'Range',
                args: {min: 0, max: 100},
                ordinal: 1,
                dataType: 'number'
            }],
            required: true,
            groups: []
        }

        describe('Rule Engine Tests: Trial 3 - Should be a number from 0 to 100', async() => {
            
            it (`Field Value: 0 should be true`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx(0, trial3)
                expect(response).not.null
                expect(response.successful).to.equal(true)
            
            })
            it (`Field Value: null should be false`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx(null, trial3)
                expect(response).not.null
                expect(response.successful).to.equal(false)

            })
            it (`Field Value: '55' should be true`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx('55', trial3)
                expect(response).not.null
                expect(response.successful).to.equal(true)

            })
            it (`Field Value: 101 should be false`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx(101, trial3)
                expect(response).not.null
                expect(response.successful).to.equal(false)

            })

        })

    }
}

// Need to run an await method to setup for testing. so using simple class method
const tester = new Tester()
tester.run()
