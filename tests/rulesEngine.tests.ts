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
            name: 'trial1',
            rules: [{
                className: 'StartsWith',
                args: "$",
                ordinal: 0
            }],
            groups: []
        }
        describe('Rule Engine Tests: Trial 1 - Single Operation', async() => {
            
            it (`Field Value: '$123.00' starts with '$' should be true`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx('$123.00', trial1)
                expect(response).not.null
                expect(response.successful).to.equal(true)
            
            })

        })

        const trial2: IRuleContainerSchema = {
            name: 'trial2',
            rules: [{
                className: 'StartsWith',
                args: '%',
                ordinal: 0,
                expectFalse: true
            }],
            groups: []
        }
        describe('Rule Engine Tests: Trial 2 - Single Operation Expect False', async() => {
            
            it (`Field Value: Starts with '%' should be false`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx('$123.00', trial2)
                expect(response).not.null
                expect(response.successful).to.equal(true)
            
            })

        })

        const trial3: IRuleContainerSchema = {
            name: 'trial3',
            rules: [{
                className: 'StartsWith',
                args: '#',
                ordinal: 0
            }],
            groups: []
        }
        describe('Rule Engine Tests: Trial 3 - Single Operation Failure', async() => {
            
            it (`Field Value: Starts with '#' should be false`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx('$123.00', trial3)
                expect(response).not.null
                expect(response.successful).to.equal(false)
            
            })

        })

        const trial11: IRuleContainerSchema = {
            name: 'trial11',
            rules: [{
                className: 'StartsWith',
                args: '$',
                group: 'A',
                ordinal: 0
            },{
                className: 'EndsWith',
                args: '.00',
                group: 'A',
                ordinal: 1
            },{
                className: 'Contains',
                args: '.',
                group: 'B',
                ordinal: 0
            },{
                className: 'Length',
                args: 7,
                group: 'B',
                ordinal: 1
            }],
            groups: [{
                id: 'A',
                conjunction: 'and',
                ordinal: 0,
                notes: []
            },{
                id: 'B',
                conjunction: 'and',
                ordinal: 1,
                notes: []
            }]
        }

        describe('Rule Engine Tests: Trial 11 - Two Groups, Four Operations, AND', async() => {
            
            it (`Field Value: '$123.00' starts with '$', endsWith '.00' AND contains '.', has a length of 7 should be true`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx('$123.00', trial11)
                expect(response).not.null
                expect(response.successful).to.equal(true)
            
            })
            it (`Field Value: '$123.10' starts with '$', endsWith '.00' AND contains '.', has a length of 7 should be false`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx('$123.10', trial11)
                expect(response).not.null
                expect(response.successful).to.equal(false)
            
            })

        })

        const trial12: IRuleContainerSchema = {
            name: 'trial11',
            rules: [{
                className: 'StartsWith',
                args: '$',
                group: 'A',
                ordinal: 0
            },{
                className: 'EndsWith',
                args: '.55',
                group: 'A',
                ordinal: 1
            },{
                className: 'Contains',
                args: '.',
                group: 'B',
                ordinal: 0
            },{
                className: 'Length',
                args: 7,
                group: 'B',
                ordinal: 1
            }],
            groups: [{
                id: 'A',
                conjunction: 'and',
                ordinal: 0,
                notes: []
            },{
                id: 'B',
                conjunction: 'or',
                ordinal: 1,
                notes: []
            }]
        }
        describe('Rule Engine Tests: Trial 12 - Two Groups, Four Operations, OR', async() => {
            
            it (`Field Value: '$123.00' starts with '$', endsWith '.55' (fail) OR contains '.', has a length of 7 should be true`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx('$123.00', trial12)
                expect(response).not.null
                expect(response.successful).to.equal(true)
            
            })
            it (`Field Value: '$12.00' starts with '$', endsWith '.55' (fail) OR contains '.', has a length of 7 (fail) should be false`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx('$12.00', trial12)
                expect(response).not.null
                expect(response.successful).to.equal(false)
            
            })

        })

        const trial13: IRuleContainerSchema = {
            name: 'trial13',
            rules: [{
                className: 'StartsWith',
                args: '$',
                group: 'A',
                ordinal: 0
            },{
                className: 'EndsWith',
                args: '.55',
                group: 'A',
                ordinal: 1
            },{
                className: 'Contains',
                args: '.',
                group: 'B',
                ordinal: 0
            },{
                className: 'Length',
                args: 8,
                group: 'B',
                ordinal: 1
            },{
                className: 'Contains',
                args: '$',
                group: 'C',
                ordinal: 0
            }],
            groups: [{
                id: 'A',
                conjunction: 'and',
                ordinal: 0,
                notes: []
            },{
                id: 'B',
                conjunction: 'and',
                ordinal: 1,
                notes: []
            },{
                id: 'C',
                conjunction: 'or',
                ordinal: 2,
                notes: []
            }]
        }
        describe('Rule Engine Tests: Trial 13 - Two Groups, Four Operations, AND/OR', async() => {
            
            it (`Field Value: '$123.00' starts with '$', endsWith '.55' (fail) AND contains '.', has a length of 8 (fail) OR contains '$' should be true`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx('$123.00', trial13)
                expect(response).not.null
                expect(response.successful).to.equal(true)
            
            })
            it (`Field Value: '^123.00' starts with '$' (fail), endsWith '.55' (fail) AND contains '.', has a length of 8 (fail) OR contains '$' (fail) should be false`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx('^123.00', trial13)
                expect(response).not.null
                expect(response.successful).to.equal(false)
            
            })

        })

        const trial14: IRuleContainerSchema = {
            name: 'trial14',
            rules: [{
                className: 'IsNumber',
                args: null,
                ordinal: 0,
                dataType: 'number',
                group: 'A'
            },{
                className: 'Range',
                args: {min: 0, max: 100},
                ordinal: 1,
                dataType: 'number',
                group: 'A'
            },{
                className: 'Range',
                args: {min: 1000, max: 1999},
                ordinal: 2,
                dataType: 'number',
                conjunction: 'or',
                group: 'A'
            },{
                className: 'Equals',
                args: 999,
                ordinal: 3,
                conjunction: 'or',
                dataType: 'number',
                group: 'A'
            }],
            groups: [{
                id: 'A',
                ordinal: 0,
                notes: [],
                conjunction: 'and'
            }],
            required: true

        }
        describe('Rule Engine Tests: Trial 14 - Should be a number AND from 0 to 100 OR 1000 to 1999 OR 999', async() => {
            
            it (`Field Value: 0 should be true`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx(0, trial14)
                expect(response).not.null
                expect(response.successful).to.equal(true)
            
            })
            it (`Field Value: null should be false`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx(null, trial14)
                expect(response).not.null
                expect(response.successful).to.equal(false)

            })
            it (`Field Value: '55' should be true`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx('55', trial14)
                expect(response).not.null
                expect(response.successful).to.equal(true)

            })
            it (`Field Value: 101 should be false`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx(101, trial14)
                expect(response).not.null
                expect(response.successful).to.equal(false)

            })
            it (`Field Value: 1001 should be true`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx(1001, trial14)
                expect(response).not.null
                expect(response.successful).to.equal(true)

            })
            it (`Field Value: 2000 should be false`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx(2000, trial14)
                expect(response).not.null
                expect(response.successful).to.equal(false)

            })
            it (`Field Value: 999 should be true`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx(999, trial14)
                expect(response).not.null
                expect(response.successful).to.equal(true)

            })
            it (`Field Value: 998 should be false`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx(998, trial14)
                expect(response).not.null
                expect(response.successful).to.equal(false)

            })
            it (`Field Value: '999' should be true`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx('999', trial14)
                expect(response).not.null
                expect(response.successful).to.equal(true)

            })
            it (`Field Value: '87' should be true`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx('87', trial14)
                expect(response).not.null
                expect(response.successful).to.equal(true)

            })
            it (`Field Value: '104' should be false`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx('104', trial14)
                expect(response).not.null
                expect(response.successful).to.equal(false)

            })
            it (`Field Value: '1337' should be true`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx('1337', trial14)
                expect(response).not.null
                expect(response.successful).to.equal(true)

            })
            it (`Field Value: 'X509' should be false`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx('X509', trial14)
                expect(response).not.null
                expect(response.successful).to.equal(false)

            })
            it (`Field Value: '' should be false`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx('', trial14)
                expect(response).not.null
                expect(response.successful).to.equal(false)

            })

        })

    }
}

// Need to run an await method to setup for testing. so using simple class method
const tester = new Tester()
tester.run()
