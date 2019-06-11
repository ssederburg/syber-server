import * as chai from 'chai'
import { AssertionError } from 'assert'
import { isNullOrUndefined } from 'util'

import { ExecutionContext, MockSyberServer, MockRequestContext, MockSchematic, 
    RawComposer, FieldComposer, RuleEngineHelper, MockRuleProcessor, IRuleContainerSchema, KeyValuePair } from '../src'

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

        const trial1Values: Array<KeyValuePair> = [
            { key: 'trial1', value: '$123.00'}
        ]
        const trial1: Array<IRuleContainerSchema> = [{
            name: 'trial1',
            rules: [{
                className: 'StartsWith',
                args: "$",
                ordinal: 0
            }],
            groups: []
        }]
        describe('Rule Engine Tests: Trial 1 - Single Operation', async() => {
            
            it (`Field Value: '$123.00' starts with '$' should be true`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx(trial1Values, trial1)
                expect(response).not.null
                expect(response.successful).to.equal(true)
            
            })

        })

        const trial2Values: Array<KeyValuePair> = [
            { key: 'trial2', value: '$123.00'}
        ]
        const trial2: Array<IRuleContainerSchema> = [{
            name: 'trial2',
            rules: [{
                className: 'StartsWith',
                args: '%',
                ordinal: 0,
                expectFalse: true
            }],
            groups: []
        }]
        describe('Rule Engine Tests: Trial 2 - Single Operation Expect False', async() => {
            
            it (`Field Value: Starts with '%' should be false`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx(trial2Values, trial2)
                expect(response).not.null
                expect(response.successful).to.equal(true)
            
            })

        })

        const trial3Values: Array<KeyValuePair> = [
            { key: 'trial3', value: '$123.00'}
        ]
        const trial3: Array<IRuleContainerSchema> = [{
            name: 'trial3',
            rules: [{
                className: 'StartsWith',
                args: '#',
                ordinal: 0,
                note: `Text must start with #`
            }],
            groups: []
        }]
        describe('Rule Engine Tests: Trial 3 - Single Operation Failure', async() => {
            
            it (`Field Value: Starts with '#' should be false`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx(trial3Values, trial3)
                expect(response).not.null
                expect(response.successful).to.equal(false)
            
            })

        })

        const trial11AValues: Array<KeyValuePair> = [
            { key: 'trial11', value: '$123.00'}
        ]
        const trial11BValues: Array<KeyValuePair> = [
            { key: 'trial11', value: '$123.10'}
        ]
        const trial11: Array<IRuleContainerSchema> = [{
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
        }]
        describe('Rule Engine Tests: Trial 11 - Two Groups, Four Operations, AND', async() => {
            
            it (`Field Value: '$123.00' starts with '$', endsWith '.00' AND contains '.', has a length of 7 should be true`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx(trial11AValues, trial11)
                expect(response).not.null
                expect(response.successful).to.equal(true)
            
            })
            it (`Field Value: '$123.10' starts with '$', endsWith '.00' AND contains '.', has a length of 7 should be false`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx(trial11BValues, trial11)
                expect(response).not.null
                expect(response.successful).to.equal(false)
            
            })

        })

        const trial12AValues: Array<KeyValuePair> = [
            { key: 'trial12', value: '$123.00'}
        ]
        const trial12BValues: Array<KeyValuePair> = [
            { key: 'trial12', value: '$12.00'}
        ]
        const trial12: Array<IRuleContainerSchema> = [{
            name: 'trial12',
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
        }]
        describe('Rule Engine Tests: Trial 12 - Two Groups, Four Operations, OR', async() => {
            
            it (`Field Value: '$123.00' starts with '$', endsWith '.55' (fail) OR contains '.', has a length of 7 should be true`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx(trial12AValues, trial12)
                expect(response).not.null
                expect(response.successful).to.equal(true)
            
            })
            it (`Field Value: '$12.00' starts with '$', endsWith '.55' (fail) OR contains '.', has a length of 7 (fail) should be false`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx(trial12BValues, trial12)
                expect(response).not.null
                expect(response.successful).to.equal(false)
            
            })

        })

        const trial13AValues: Array<KeyValuePair> = [
            { key: 'trial13', value: '$123.00'}
        ]
        const trial13BValues: Array<KeyValuePair> = [
            { key: 'trial13', value: '^123.00'}
        ]
        const trial13: Array<IRuleContainerSchema> = [{
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
        }]
        describe('Rule Engine Tests: Trial 13 - Two Groups, Four Operations, AND/OR', async() => {
            
            it (`Field Value: '$123.00' starts with '$', endsWith '.55' (fail) AND contains '.', has a length of 8 (fail) OR contains '$' should be true`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx(trial13AValues, trial13)
                expect(response).not.null
                expect(response.successful).to.equal(true)
            
            })
            it (`Field Value: '^123.00' starts with '$' (fail), endsWith '.55' (fail) AND contains '.', has a length of 8 (fail) OR contains '$' (fail) should be false`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx(trial13BValues, trial13)
                expect(response).not.null
                expect(response.successful).to.equal(false)
            
            })

        })

        const trial14AValues: Array<KeyValuePair> = [{ key: 'trial14', value: 0}]
        const trial14BValues: Array<KeyValuePair> = [{ key: 'trial14', value: null}]
        const trial14CValues: Array<KeyValuePair> = [{ key: 'trial14', value: '55'}]
        const trial14DValues: Array<KeyValuePair> = [{ key: 'trial14', value: 101}]
        const trial14EValues: Array<KeyValuePair> = [{ key: 'trial14', value: 1001}]
        const trial14FValues: Array<KeyValuePair> = [{ key: 'trial14', value: 2000}]
        const trial14GValues: Array<KeyValuePair> = [{ key: 'trial14', value: 999}]
        const trial14HValues: Array<KeyValuePair> = [{ key: 'trial14', value: 998}]
        const trial14IValues: Array<KeyValuePair> = [{ key: 'trial14', value: '999'}]
        const trial14JValues: Array<KeyValuePair> = [{ key: 'trial14', value: '87'}]
        const trial14KValues: Array<KeyValuePair> = [{ key: 'trial14', value: '104'}]
        const trial14LValues: Array<KeyValuePair> = [{ key: 'trial14', value: '1337'}]
        const trial14MValues: Array<KeyValuePair> = [{ key: 'trial14', value: 'X509'}]
        const trial14NValues: Array<KeyValuePair> = [{ key: 'trial14', value: ''}]
        const trial14: Array<IRuleContainerSchema> = [{
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
            required: true,
            note: `Must be a number from 0 to 100, 1000 to 1999 or the value 999`

        }]
        describe('Rule Engine Tests: Trial 14 - Should be a number AND from 0 to 100 OR 1000 to 1999 OR 999', async() => {
            
            it (`Field Value: 0 should be true`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx(trial14AValues, trial14)
                expect(response).not.null
                expect(response.successful).to.equal(true)
            
            })
            it (`Field Value: null should be false`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx(trial14BValues, trial14)
                expect(response).not.null
                expect(response.successful).to.equal(false)

            })
            it (`Field Value: '55' should be true`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx(trial14CValues, trial14)
                expect(response).not.null
                expect(response.successful).to.equal(true)

            })
            it (`Field Value: 101 should be false`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx(trial14DValues, trial14)
                expect(response).not.null
                expect(response.successful).to.equal(false)

            })
            it (`Field Value: 1001 should be true`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx(trial14EValues, trial14)
                expect(response).not.null
                expect(response.successful).to.equal(true)

            })
            it (`Field Value: 2000 should be false`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx(trial14FValues, trial14)
                expect(response).not.null
                expect(response.successful).to.equal(false)

            })
            it (`Field Value: 999 should be true`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx(trial14GValues, trial14)
                expect(response).not.null
                expect(response.successful).to.equal(true)

            })
            it (`Field Value: 998 should be false`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx(trial14HValues, trial14)
                expect(response).not.null
                expect(response.successful).to.equal(false)

            })
            it (`Field Value: '999' should be true`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx(trial14IValues, trial14)
                expect(response).not.null
                expect(response.successful).to.equal(true)

            })
            it (`Field Value: '87' should be true`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx(trial14JValues, trial14)
                expect(response).not.null
                expect(response.successful).to.equal(true)

            })
            it (`Field Value: '104' should be false`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx(trial14KValues, trial14)
                expect(response).not.null
                expect(response.successful).to.equal(false)

            })
            it (`Field Value: '1337' should be true`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx(trial14LValues, trial14)
                expect(response).not.null
                expect(response.successful).to.equal(true)

            })
            it (`Field Value: 'X509' should be false`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx(trial14MValues, trial14)
                expect(response).not.null
                expect(response.successful).to.equal(false)

            })
            it (`Field Value: '' should be false`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx(trial14NValues, trial14)
                expect(response).not.null
                expect(response.successful).to.equal(false)

            })

        })

        const trial15Values: Array<KeyValuePair> = [
            { key: 'trial15', value: 0},
            { key: 'trial15', value: 50},
            { key: 'trial15', value: 100},
            { key: 'trial15', value: '47'},
            { key: 'trial15', value: 999},
            { key: 'trial15', value: '999'},
            { key: 'trial15', value: 2},
            { key: 'trial15', value: '99'},
        ]
        const trial15: Array<IRuleContainerSchema> = [{
            name: 'trial15',
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
                className: 'Equals',
                args: 999,
                ordinal: 3,
                conjunction: 'or',
                dataType: 'number',
                group: 'A'
            }],
            groups: [{
                id: 'A',
                ordinal: 0
            }],
            required: true,
            note: `Must be a number from 0 to 100 or the value 999`,
            dataType: 'number'
        }]
        describe('Rule Engine Tests: Trial 15 - Data Document with Policies', async() => {
            
            it (`Field Value: All document items pass should be true`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx(trial15Values, trial15)
                expect(response).not.null
                expect(response.successful).to.equal(true)
            
            })

        })

        const trial16ValuesPass = {
            SOMETHING: 'ABC',
            SOMETHINGELSE: '456'
        }
        const trial16ValuesFail1 = {
            SOMETHING: 'abc',
            SOMETHINGELSE: '456'
        }
        const trial16ValuesFail2 = {
            SOMETHING: 'ABC',
            SOMETHINGELSE: 'NOTANUMBER'
        }
        const trial16: Array<IRuleContainerSchema> = [{
            name: 'SOMETHING',
            required: true,
            note: 'Must equal ABC',
            dataType: 'string',
            rules: [{
                className: 'Equals',
                args: 'ABC',
                ordinal: 0
            }]
        },{
            name: 'SOMETHINGELSE',
            required: false,
            note: 'Should have a length of 3 and be numeric',
            dataType: 'number',
            rules: [{
                className: 'Length',
                args: 3,
                ordinal: 0
            }]
        }]
        describe('Rule Engine Tests: Trial 16 - Object of Values with Policies', async() => {
            
            it (`Field Value: All object items pass should be true`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx2(trial16ValuesPass, trial16)
                expect(response).not.null
                expect(response.successful).to.equal(true)
            
            })
            it (`Field Value: First fail object values should be false`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx2(trial16ValuesFail1, trial16)
                expect(response).not.null
                expect(response.successful).to.equal(false)
            
            })
            it (`Field Value: Second fail object values should be false`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx2(trial16ValuesFail2, trial16)
                expect(response).not.null
                expect(response.successful).to.equal(false)
            
            })

        })

        const trial17ValuesPass = {
            SOMETHING: '',
            SOMETHINGELSE: '456'
        }
        const trial17: Array<IRuleContainerSchema> = [{
            name: 'SOMETHING',
            required: true,
            note: 'Length between 0 and 24',
            rules: [{
                className: 'Length',
                args: {
                    min: 0,
                    max: 24
                },
                ordinal: 0
            }]
        },{
            name: 'SOMETHINGELSE',
            required: true,
            note: 'Length between 0 and 24',
            rules: [{
                className: 'Length',
                args: {
                    min: 0,
                    max: 24
                },
                ordinal: 0
            }]
        }]
        describe('Rule Engine Tests: Trial 17 - Object of Values with Policies', async() => {
            it (`Field Value: All object items pass should be true`, async() => {

                const mockProcessor = new MockRuleProcessor(mockExecutionContextTest1, {
                    class: MockRuleProcessor
                }, mockSyberServer.logger)
                const response = await mockProcessor.mockFx2(trial17ValuesPass, trial17)
                expect(response).not.null
                expect(response.successful).to.equal(true)
            
            })
        })
    }
}

// Need to run an await method to setup for testing. so using simple class method
const tester = new Tester()
tester.run()
