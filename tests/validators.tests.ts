import * as chai from 'chai'

import { Contains, ContainsAny, EndsWith, EndsWithAny, IsArray, IsFloat, IsObject, Length, Max, MaxDate,
    MaxLength, Min, MinDate, MinLength, Range, StartsWith, StartsWithAny, IsNotNullOrEmpty, Equals, EqualsAny,
    RegEx, IsNullOrEmpty, IsDate, IsNumber, IsString, DateRange, IsInteger } from '../src'

const should = chai.should()
const expect = chai.expect

chai.use(require('chai-as-promised'))

describe(`Validator Tests`, () => {
    // #region Contains
    it (`Contains: string 123 in 0123456789 should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Contains(`0123456789`, `123`)
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Contains: string 123 in 01223456789 should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Contains(`01223456789`, `123`)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Contains: string 123 in 1233456789 should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Contains(`1233456789`, `123`)
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Contains: string 123 in 3456789123 should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Contains(`3456789123`, `123`)
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Contains: string 123 in 1233456789123 should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Contains(`1233456789123`, `123`)
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Contains: string 123 in null should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Contains(null, `123`)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Contains: string 123 in empty string should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Contains('', `123`)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Contains: empty string in empty string should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Contains('', '')
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Contains: empty string in 'nothing here' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Contains('nothing here', '')
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Contains: 'Abc' in '12ABCCdEAC' when ignoreCase should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Contains('12AbCCdEAC', {value: `Abc`, ignoreCase: true})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Contains: 'ABC' in '12AbCCdEAC' when NOT ignoreCase should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Contains('12AbCCdEAC', {value: 'Abc', ignoreCase: false})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })

    // #endregion Contains

    // #region ContainsAny
    it (`ContainsAny: string 1234567890 contain any of ['333', '445533', '3456', '55443366'] should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = ContainsAny(`1234567890`, ['333', '445533', '3456', '55443366'])
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`ContainsAny: string 1234567890 contain any of ['333', '445533', '7651223777', '55443366'] should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = ContainsAny(`1234567890`, ['333', '445533', '7651223777', '55443366'])
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`ContainsAny: string 1234567890 contain any of ['333', '445533', '12343777', '55443366', '1234567890'] should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = ContainsAny(`1234567890`, ['333', '445533', '12343777', '55443366', '1234567890'])
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`ContainsAny: string 1234567890 contain any of ['333', '445533', '---1234567890---', 43777123', '55443366'] should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = ContainsAny(`1234567890`, ['333', '445533', '---1234567890---', '43777123', '55443366'])
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`ContainsAny: string 123 contain any of ['333', '4412235533', '43777123', '55443366'] should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = ContainsAny(`123`, ['333', '4412235533', '43777123', '55443366'])
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`ContainsAny: string 123 contain any of [] should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = ContainsAny( `123`, [])
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`ContainsAny: string 123 contain any of null should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = ContainsAny(`123`, null)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`ContainsAny: string AABCCDDFF contain any of ['ddd', 'Abc'] with ignoreCase should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = ContainsAny(`AABCCDDFF`, { value: ['ddd', 'Abc'], ignoreCase: true})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`ContainsAny: string AABCCDDFF contain any of ['ddd', 'Abc'] with NOT ignoreCase should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = ContainsAny(`AABCCDDFF`, { value: ['ddd', 'Abc'], ignoreCase: false})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    // #endregion ContainsAny

    // #region EndsWith
    it (`EndsWith: string 0123456123 ends with 123 should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = EndsWith(`0123456123`, `123`)
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`EndsWith: string 01223456122 ends with 123 should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = EndsWith(`01223456122`, `123`)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`EndsWith: string 34567891234 ends with 123 should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = EndsWith(`34567891234`, `123`)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`EndsWith: string null ends with 123 should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = EndsWith(null, `123`)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`EndsWith: string empty string ends with 123 should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = EndsWith('', `123`)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`EndsWith: empty string ends with empty string should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = EndsWith('', '')
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`EndsWith: 'nothing here' ends with empty string  should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = EndsWith('nothing here', '')
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`EndsWith: '12ABCCdABC' ends with 'Abc' when ignoreCase is true should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = EndsWith('12ABCCdABC', {value: 'Abc', ignoreCase: true})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`EndsWith: '12AbCCdEABC' ends with 'Abc' when NOT ignoreCase should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = EndsWith('12AbCCdEABC', {value: 'Abc', ignoreCase: false})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    // #endregion EndsWith

    // #region EndsWithAny
    it (`EndsWithAny: string 0123456123 ends with either ['123', '444', '111'] should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = EndsWithAny(`0123456123`, ['123', '444', '111'])
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`EndsWithAny: string 0123456123 ends with either ['122', '444', '111'] should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = EndsWithAny(`0123456123`, ['122', '444', '111'])
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`EndsWithAny: string null ends with either ['122', '444', '111'] should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = EndsWithAny(null, ['122', '444', '111'])
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`EndsWithAny: string '' ends with either ['122', '444', '111'] should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = EndsWithAny('', ['122', '444', '111'])
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`EndsWithAny: string '0123456789' ends with either [] should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = EndsWithAny('0123456789', [])
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`EndsWithAny: string '0123456789' ends with null should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = EndsWithAny('0123456789', null)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`EndsWithAny: string 'ABCDEFG' ends with ['efg'] when ignoreCase is true should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = EndsWithAny('ABCDEFG', { value: ['efg'], ignoreCase: true})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`EndsWithAny: string 'ABCDEFG' ends with ['efg'] when ignoreCase is false should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = EndsWithAny('ABCDEFG', { value: ['efg'], ignoreCase: false})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`EndsWithAny: string 'ABCDEFG' ends with ['efgg'] when ignoreCase is true should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = EndsWithAny('ABCDEFG', { value: ['efgg'], ignoreCase: false})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })

    // #endregion

    // #region IsArray
    it (`IsArray: ['1', '2'] should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsArray(['1', '2'])
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsArray: [1, 2] should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsArray([1, 2])
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsArray: [1, null] should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsArray([1, null])
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsArray: [1, {key: 'value'}] should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsArray([1, {key: 'value'}])
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsArray: {} should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsArray({})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsArray: '1' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsArray('1')
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsArray: 1 should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsArray(1)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsArray: [null] should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsArray([null])
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsArray: null should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsArray(null)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    // #endregion

    // #region IsFloat
    it (`IsFloat: '1.0' should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsFloat('1.0')
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsFloat: '1' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsFloat('1')
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsFloat: '1000.000001.00' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsFloat('1000.000001.1')
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsFloat: null should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsFloat(null)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsFloat: undefined should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsFloat(undefined)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsFloat: '' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsFloat('')
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsFloat: '123.4501' {precision: 7} should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsFloat('123.4501', {precision: 7})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsFloat: '123.4501' {precision: 5} should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsFloat('123.4501', {precision: 5})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsFloat: '123.4501' {minPrecision: 3} should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsFloat('123.4501', {minPrecision: 3})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsFloat: '123.4501' {minPrecision: 8} should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsFloat('123.4501', {minPrecision: 8})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsFloat: '123.4501' {maxPrecision: 8} should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsFloat('123.4501', {maxPrecision: 8})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsFloat: '123.4501' {maxPrecision: 6} should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsFloat('123.4501', {maxPrecision: 6})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsFloat: '123.4501' {minPrecision: 3, maxPrecision: 8} should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsFloat('123.4501', {minPrecision: 3, maxPrecision: 8})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsFloat: '123.4501' {minPrecision: 8, maxPrecision: 10} should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsFloat('123.4501', {minPrecision: 8, maxPrecision: 10})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsFloat: '123.4501' {minPrecision: 3, maxPrecision: 5} should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsFloat('123.4501', {minPrecision: 3, maxPrecision: 5})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsFloat: '123.4501' {scale: 4} should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsFloat('123.4501', {scale: 4})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsFloat: '123.4501' {scale: 3} should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsFloat('123.4501', {scale: 3})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsFloat: '123.4501' {scale: 5} should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsFloat('123.4501', {scale: 5})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsFloat: '123.4501' {minScale: 4} should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsFloat('123.4501', {minScale: 1})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsFloat: '123.4501' {minScale: 5} should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsFloat('123.4501', {minScale: 5})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsFloat: '123.4501' {maxScale: 4} should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsFloat('123.4501', {maxScale: 4})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsFloat: '123.4501' {maxScale: 3} should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsFloat('123.4501', {maxScale: 3})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsFloat: '123,4501' {decimalChar: ','} should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsFloat('123,4501', {decimalChar: ','})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsFloat: '123,4501' {decimalChar: ',', precision: 7, scale: 4} should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsFloat('123,4501', {decimalChar: ',', precision: 7, scale: 4})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsFloat: '123,4501' {decimalChar: ',', precision: 6, scale: 4} should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsFloat('123,4501', {decimalChar: ',', precision: 6, scale: 4})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })

    it (`IsFloat: '123,4501' {decimalChar: ',', precision: 7, scale: 3} should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsFloat('123,4501', {decimalChar: ',', precision: 7, scale: 3})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    // #endregion

    // #region IsObject
    it (`IsObject: {name: '123'} should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsObject({ name: '123'})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsObject: {name: null, value: { sub: '123'}} should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsObject({name: null, value: { sub: '123'}})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsObject: null should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsObject(null)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsObject: undefined should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsObject(undefined)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsObject: ['12', 'abc'] should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsObject(['12', 'abc'])
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsObject: 'A String' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsObject('A String')
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsObject: '{notvalid; json}' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsObject('{notvalid; json}')
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsObject: '{"valid": "json"}' should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsObject('{"valid": "json"}')
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsObject: '{invalid: "json"}' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsObject('{invalid: "json"}')
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })

    // #endregion

    // #region Length
    it (`Length: Length of 'ABCD' is 4 should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Length('ABCD', 4)
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Length: Length of 'ABCD' is 5 should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Length('ABCD', 5)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Length: Length of 'ABCD' is null should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Length('ABCD', null)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Length: Length of 'ABCD' is undefined should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Length('ABCD', undefined)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Length: Length of 'ABCD' is '' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Length('ABCD', '')
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Length: 'ABCD' {min: 3} should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Length('ABCD', {min: 3})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Length: 'ABCD' {min: 5} should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Length('ABCD', {min: 5})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Length: 'ABCD' {max: 5} should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Length('ABCD', {max: 5})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Length: 'ABCD' {max: 3} should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Length('ABCD', {max: 3})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Length: 'ABCD '{min: 3, max: 5} should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Length('ABCD', {min: 3, max: 5})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Length:'ABCD' {min: 0, max: 3} should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Length('ABCD', {min: 0, max: 3})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Length: 'ABCD' {min: 5, max: 3} should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Length('ABCD', {min: 5, max: 3})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Length: 'ABCDEFGHIJKLMNO' {min: 17, max: 16} should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Length('ABCD', {min: 17, max: 16})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Length: '' {length: 2} should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Length('', {length: 2})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Length: null {length: 2} should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Length(null, {length: 2})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Length: '' {length: 0} should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Length('', {length: 0})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Length: '' {min: 0} should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Length('', {min: 0})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Length: null {min: 0} should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Length(null, {min: 0})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Length: '' {min: 0, max: 0} should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Length('', {min: 0, max: 0})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Length: '' {min: 0, max: 24} should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Length('', {min: 0, max: 24})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    // #endregion

    // #region Max
    it (`Max: 4 with max of 4 should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Max(4, 4)
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Max: 4 with max of 3 should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Max(4, 3)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Max: 0 with max of 4 should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Max(0, 4)
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Max: 4 with max of 0 should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Max(4, 0)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Max: -4 with max of 0 should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Max(-4, 0)
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Max: null with max of 4 should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Max(null, 4)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Max: null with max of null should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Max(null, null)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Max: '0' with max of '1' should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Max('0', '1')
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Max: {} with max of 4 should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Max({}, 4)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Max: 0 with max of -4 should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Max(0, -4)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    // #endregion

    // #region MaxDate
    it (`MaxDate: '2019-12-31' with max of '2020-12-31' should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = MaxDate('2019-12-31', '2020-12-31')
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`MaxDate: 'now' with max of 'now+30' should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = MaxDate('now', 'now+30')
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`MaxDate: 'now' with max of 'now - 1' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = MaxDate('now', 'now - 1')
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`MaxDate: '03/24/2010' with max of 'now' should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = MaxDate('03/24/2010', { max: 'now', sourceFormat: 'MM/DD/YYYY'})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`MaxDate: '03/24/2030' with max of 'now' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = MaxDate('03/24/2030', { max: 'now', sourceFormat: 'MM/DD/YYYY'})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`MaxDate: '03/24/20233' with max of 'now' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = MaxDate('03/24/20233', { max: 'now', sourceFormat: 'MM/DD/YYYY'})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`MaxDate: null with max of 'now' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = MaxDate(null, { max: 'now', sourceFormat: 'MM/DD/YYYY'})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`MaxDate: '03/24/2033' with max of null should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = MaxDate('03/24/2033', { max: null, sourceFormat: 'MM/DD/YYYY'})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`MaxDate: '' with max of 'now' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = MaxDate('', { max: 'now', sourceFormat: 'MM/DD/YYYY'})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`MaxDate: '20180913144636' with max of 'now+1' should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = MaxDate('20180913144636', { max: 'now+1', sourceFormat: 'YYYYMMDDHHmmss'})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`MaxDate: '20180913144636' with max of '20180913144637' should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = MaxDate('20180913144636', { max: '20180913144637', sourceFormat: 'YYYYMMDDHHmmss', maxFormat: 'YYYYMMDDHHmmss'})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`MaxDate: '20180913144636' with min of '20180913144635' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = MaxDate('20180913144636', { max: '20180913144635', sourceFormat: 'YYYYMMDDHHmmss', maxFormat: 'YYYYMMDDHHmmss'})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    // #endregion

    // #region MaxLength
    it (`MaxLength: 'ABCD' with max of 4 should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = MaxLength('ABCD', {max: 4})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`MaxLength: 'ABCD' with max of 3 should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = MaxLength('ABCD', {max: 3})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`MaxLength: 'ABCD' with max of -4 should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = MaxLength('ABCD', {max: -4})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`MaxLength: null with max of -4 should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = MaxLength(null, {max: -4})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`MaxLength: 'ABCD' with max of null should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = MaxLength('ABCD', {max: null})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`MaxLength: 'ABCD' with max of 'Not a number' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = MaxLength('ABCD', {max: 'Not a number'})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`MaxLength: '' {max: 10} should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = MaxLength('', {max: 10})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`MaxLength: '' {max: 0} should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = MaxLength('', {max: 0})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`MaxLength: null {max: 10} should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = MaxLength(null, {max: 10})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    // #endregion

    // #region Min
    it (`Min: 4 with min of 4 should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Min(4, 4)
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Min: 3 with min of 4 should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Min(3, 4)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Min: 0 with min of -4 should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Min(0, -4)
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Min: 4 with min of 0 should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Min(4, 0)
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Min: -4 with min of -10 should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Min(-4, -10)
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Min: null with min of 4 should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Min(null, 4)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Min: null with min of null should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Min(null, null)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Min: '1' with min of '0' should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Min('1', '0')
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Min: {} with min of 4 should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Min({}, 4)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Min: 0 with min of 0 should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Min(0, 0)
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Min: 0 with min of 0.001 should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Min(0, 0.001)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Min: 1 with min of 0.0009 should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Min(1, 0.0009)
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    // #endregion

    // #region MinDate
    it (`MinDate: '2019-12-31' with min of '2017-12-31' should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = MinDate('2019-12-31', '2017-12-31')
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`MinDate: 'now' with min of 'now-30' should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = MinDate('now', 'now-30')
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`MinDate: 'now' with min of 'now + 1' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = MinDate('now', 'now + 1')
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`MinDate: '03/24/2030' with min of 'now' should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = MinDate('03/24/2030', { min: 'now', sourceFormat: 'MM/DD/YYYY'})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`MinDate: '03/24/2013' with min of 'now' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = MinDate('03/24/2010', { min: 'now', sourceFormat: 'MM/DD/YYYY'})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`MinDate: '03/24/20133' with max of 'now' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = MinDate('03/24/20133', { min: 'now', sourceFormat: 'MM/DD/YYYY'})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`MinDate: null with min of 'now' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = MinDate(null, { min: 'now', sourceFormat: 'MM/DD/YYYY'})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`MinDate: '03/24/2033' with min of null should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = MinDate('03/24/2033', { min: null, sourceFormat: 'MM/DD/YYYY'})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`MinDate: '' with min of 'now' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = MinDate('', { min: 'now', sourceFormat: 'MM/DD/YYYY'})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`MinDate: '20380913144636' with min of 'now+1' should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = MinDate('20380913144636', { min: 'now+1', sourceFormat: 'YYYYMMDDHHmmss'})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`MinDate: '20180913144636' with min of '20180913144635' should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = MinDate('20180913144636', { min: '20180913144635', sourceFormat: 'YYYYMMDDHHmmss', minFormat: 'YYYYMMDDHHmmss'})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`MinDate: '20180913144636' with min of '20180913144637' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = MinDate('20180913144636', { min: '20180913144637', sourceFormat: 'YYYYMMDDHHmmss', minFormat: 'YYYYMMDDHHmmss'})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })

    // #endregion

    // #region MinLength
    it (`MinLength: 'ABCD' with min of 4 should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = MinLength('ABCD', {min: 4})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`MinLength: 'ABCD' with min of 5 should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = MinLength('ABCD', {min: 5})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`MinLength: 'ABCD' with min of 4000 should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = MinLength('ABCD', {min: 4000})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`MinLength: null with min of -4 should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = MinLength(null, {min: -4})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`MinLength: 'ABCD' with min of null should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = MinLength('ABCD', {min: null})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`MinLength: 'ABCD' with min of 'Not a number' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = MinLength('ABCD', {min: 'Not a number'})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`MinLength: '' {min: 0} should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = MinLength('', {min: 0})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`MinLength: '' {min: 10} should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = MinLength('', {min: 10})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`MinLength: null {min: 0} should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = MinLength(null, {min: 0})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`MinLength: null {min: 10} should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = MinLength(null, {min: 10})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    // #endregion

    // #region Range
    it (`Range: 4 with min of 4 and max of 6 should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Range(4, {min: 4, max: 6})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Range: 5 with min of 4 and max of 6 should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Range(5, {min: 4, max: 6})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Range: 6 with min of 4 and max of 6 should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Range(6, {min: 4, max: 6})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Range: 3 with min of 4 and max of 6 should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Range(3, {min: 4, max: 6})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Range: 7 with min of 4 and max of 6 should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Range(7, {min: 4, max: 6})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Range: null with min of 4 and max of 6 should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Range(null, {min: 4, max: 6})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Range: 0 with min of 4 and max of 6 should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Range(0, {min: 4, max: 6})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Range: '1' with min of 4 and max of 6 should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Range('1', {min: 4, max: 6})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Range: '5' with min of 4 and max of 6 should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Range('5', {min: 4, max: 6})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Range: 1 with min of null and max of 6 should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Range(1, {min: null, max: 6})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Range: 1 with min of 4 and max of null should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Range(1, {min: 4, max: null})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Range: 1 with null options should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Range(1, null)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Range: .5 with {min: 0.400, max: 999.000} should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Range(`0.5`, {min: `0.400`, max: `999.000`})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Range: .35 with {min: 0.400, max: 999.000} should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Range(`0.35`, {min: `0.400`, max: `999.000`})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Range: 999.35 with {min: 0.400, max: 999.000} should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Range(`999.35`, {min: `0.400`, max: `999.000`})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Range: 999.000 with {min: 0.400, max: 999.000} should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Range(`999.000`, {min: `0.400`, max: `999.000`})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Range: 998.999 with {min: 0.400, max: 999.000} should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Range(`998.999`, {min: `0.400`, max: `999.000`})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
 
    // #endregion

    // #region StartsWith
    it (`StartsWith: string 0123456123 starts with 0123 should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = StartsWith(`0123456123`, `0123`)
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`StartsWith: string 01223456122 starts with 123 should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = StartsWith(`01223456122`, `123`)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`StartsWith: string 34567891234 starts with 123 should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = StartsWith(`34567891234`, `123`)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`StartsWith: string null starts with 123 should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = StartsWith(null, `123`)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`StartsWith: string empty string starts with 123 should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = StartsWith('', `123`)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`StartsWith: empty string starts with empty string should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = StartsWith('', '')
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`StartsWith: 'nothing here' starts with empty string should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = StartsWith('nothing here', '')
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`StartsWith: 'ABC12ABCCd' starts with 'Abc' when ignoreCase is true should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = StartsWith('ABC12ABCCd', {value: 'Abc', ignoreCase: true})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`StartsWith: 'ABC12AbCCdE' starts with 'Abc' when NOT ignoreCase should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = StartsWith('ABC12AbCCdE', {value: 'Abc', ignoreCase: false})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    // #endregion StartsWith

    // #region StartsWithAny
    it (`StartsWithAny: string 0123456123 starts with either ['0123', '444', '111'] should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = StartsWithAny(`0123456123`, ['0123', '444', '111'])
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`StartsWithAny: string 0123456123 starts with either ['0122', '444', '111'] should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = StartsWithAny(`0123456123`, ['0122', '444', '111'])
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`StartsWithAny: string null starts with either ['122', '444', '111'] should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = StartsWithAny(null, ['122', '444', '111'])
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`StartsWithAny: string '' starts with either ['122', '444', '111'] should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = StartsWithAny('', ['122', '444', '111'])
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`StartsWithAny: string '0123456789' starts with either [] should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = StartsWithAny('0123456789', [])
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`StartsWithAny: string '0123456789' starts with null should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = StartsWithAny('0123456789', null)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`StartsWithAny: string 'ABCDEFG' starts with ['abc'] when ignoreCase is true should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = StartsWithAny('ABCDEFG', { value: ['abc'], ignoreCase: true})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`StartsWithAny: string 'ABCDEFG' starts with ['abc'] when ignoreCase is false should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = StartsWithAny('ABCDEFG', { value: ['abc'], ignoreCase: false})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`StartsWithAny: string 'ABCDEFG' starts with ['abcc'] when ignoreCase is true should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = EndsWithAny('ABCDEFG', { value: ['abcc'], ignoreCase: false})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })

    // #endregion
  
    // #region IsNotNullOrEmpty
    it (`IsNotNullOrEmpty: string 0123456123 should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsNotNullOrEmpty(`0123456123`, null)
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsNotNullOrEmpty: null should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsNotNullOrEmpty(null, null)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsNotNullOrEmpty: false should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsNotNullOrEmpty(false, null)
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsNotNullOrEmpty: '' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsNotNullOrEmpty('', null)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsNotNullOrEmpty: '   ' should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsNotNullOrEmpty('   ', null)
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsNotNullOrEmpty: '   ' with trim should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsNotNullOrEmpty('   ', {trim: true})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsNotNullOrEmpty: 'null' should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsNotNullOrEmpty('null', null)
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsNotNullOrEmpty: 'null' with keywordMatch should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsNotNullOrEmpty('null', {keywordMatch: true})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsNotNullOrEmpty: 'NULL' with keywordMatch should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsNotNullOrEmpty('NULL', {keywordMatch: true})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsNotNullOrEmpty: '   NULL   ' with keywordMatch and trim should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsNotNullOrEmpty('   NULL   ', {trim: true, keywordMatch: true})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsNotNullOrEmpty: '   NULL   ' with keywordMatch but without trim should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsNotNullOrEmpty('   NULL   ', {trim: false, keywordMatch: true})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsNotNullOrEmpty: 'undefined' with keywordMatch should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsNotNullOrEmpty('undefined', {keywordMatch: true})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsNotNullOrEmpty: 'UNDEFINED' with keywordMatch should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsNotNullOrEmpty('UNDEFINED', {keywordMatch: true})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsNotNullOrEmpty: '   UNDEFINED   ' with keywordMatch and trim should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsNotNullOrEmpty('   UNDEFINED   ', {trim: true, keywordMatch: true})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsNotNullOrEmpty: '   UNDEFINED   ' with keywordMatch but without trim should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsNotNullOrEmpty('   UNDEFINED   ', {trim: false, keywordMatch: true})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    // #endregion

    // #region IsNullOrEmpty
    it (`IsNullOrEmpty: string 0123456123 should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsNullOrEmpty(`0123456123`, null)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsNullOrEmpty: null should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsNullOrEmpty(null, null)
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsNullOrEmpty: false should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsNullOrEmpty(false, null)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsNullOrEmpty: '' should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsNullOrEmpty('', null)
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsNullOrEmpty: '   ' without trim should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsNullOrEmpty('   ', null)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsNullOrEmpty: '   ' with trim should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsNullOrEmpty('   ', {trim: true})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsNullOrEmpty: 'null' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsNullOrEmpty('null', null)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsNullOrEmpty: 'null' with keywordMatch should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsNullOrEmpty('null', {keywordMatch: true})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsNullOrEmpty: 'NULL' with keywordMatch should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsNullOrEmpty('NULL', {keywordMatch: true})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsNullOrEmpty: '   NULL   ' with keywordMatch and trim should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsNullOrEmpty('   NULL   ', {trim: true, keywordMatch: true})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsNullOrEmpty: '   NULL   ' with keywordMatch but without trim should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsNullOrEmpty('   NULL   ', {trim: false, keywordMatch: true})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsNullOrEmpty: 'undefined' with keywordMatch should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsNullOrEmpty('undefined', {keywordMatch: true})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsNullOrEmpty: 'UNDEFINED' with keywordMatch should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsNullOrEmpty('UNDEFINED', {keywordMatch: true})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsNullOrEmpty: '   UNDEFINED   ' with keywordMatch and trim should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsNullOrEmpty('   UNDEFINED   ', {trim: true, keywordMatch: true})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsNullOrEmpty: '   UNDEFINED   ' with keywordMatch but without trim should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsNullOrEmpty('   UNDEFINED   ', {trim: false, keywordMatch: true})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    // #endregion

    // #region Equals
    it (`Equals: string 0123456123 equals 0123456123 should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Equals(`0123456123`, `0123456123`)
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Equals: string 01223456122 equals 0123456123 should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Equals(`01223456122`, `0123456123`)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Equals: string 34567891234 equals null should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Equals(`34567891234`, null)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Equals: string null equals 123 should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Equals(null, `123`)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Equals: string empty string equals 123 should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Equals('', `123`)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Equals: empty string equals empty string should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Equals('', '')
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Equals: 'nothing here' equals ' nothing   here   ' with trim should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Equals('nothing here', {value: ' nothing  here  ', trim: true})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Equals: '12ABCCdABC' equals '12ABCCdAbc' when ignoreCase is true should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Equals('12ABCCdABC', {value: '12ABCCdAbc', ignoreCase: true})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Equals: '12ABCCdABC' equals '12ABCCdAbc' when ignoreCase is false should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Equals('12ABCCdABC', {value: '12ABCCdAbc', ignoreCase: false})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Equals: 'Ab cD eFG Hi' equals ' ABCDEF GHI  ' when ignoreCase is false and trim is false should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Equals('Ab cD eFG Hi', {value: ' ABCDEF GHI  ', ignoreCase: false})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Equals: 'Ab cD eFG Hi' equals ' ABCDEF GHI  ' when ignoreCase is true and trim is false should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Equals('Ab cD eFG Hi', {value: ' ABCDEF GHI  ', ignoreCase: true})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`Equals: 'Ab cD eFG Hi' equals ' ABCDEF GHI  ' when ignoreCase is true and trim is true should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = Equals('Ab cD eFG Hi', {value: ' ABCDEF GHI  ', ignoreCase: true, trim: true})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    // #endregion Equals

    // #region EqualsAny
    it (`EqualsAny: string 0123456123 equals any ['abc', '0123456123'] should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = EqualsAny(`0123456123`, [`abc`, `0123456123`])
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`EqualsAny: string 01223456122 equals any ['abc', '0123456123'] should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = EqualsAny(`01223456122`, [`abc`, `0123456123`])
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`EqualsAny: string 34567891234 equals null should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = EqualsAny(`34567891234`, null)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`EqualsAny: string null equals any ['123'] should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = EqualsAny(null, [`123`])
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`EqualsAny: string empty string equals any ['123'] should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = EqualsAny('', [`123`])
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`EqualsAny: empty string equals empty string should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = EqualsAny('', '')
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`EqualsAny: 'nothing here' equals any [' nothing   here   '] with trim should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = EqualsAny('nothing here', {value: [' nothing  here  '], trim: true})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`EqualsAny: '12ABCCdABC' equals any ['12ABCCdAbc'] when ignoreCase is true should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = EqualsAny('12ABCCdABC', {value: ['12ABCCdAbc'], ignoreCase: true})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`EqualsAny: '12ABCCdABC' equals any ['12ABCCdAbc'] when ignoreCase is false should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = EqualsAny('12ABCCdABC', {value: ['12ABCCdAbc'], ignoreCase: false})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`EqualsAny: 'Ab cD eFG Hi' equals any [' ABCDEF GHI  '] when ignoreCase is false and trim is false should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = EqualsAny('Ab cD eFG Hi', {value: [' ABCDEF GHI  '], ignoreCase: false})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`EqualsAny: 'Ab cD eFG Hi' equals any [' ABCDEF GHI  '] when ignoreCase is true and trim is false should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = EqualsAny('Ab cD eFG Hi', {value: [' ABCDEF GHI  '], ignoreCase: true})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`EqualsAny: 'Ab cD eFG Hi' equals any [' ABCDEF GHI  '] when ignoreCase is true and trim is true should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = EqualsAny('Ab cD eFG Hi', {value: [' ABCDEF GHI  '], ignoreCase: true, trim: true})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    // #endregion EqualsAny

    // #region Regular Expressions
    it (`RegEx: string 10 with test '^([0-9]\d{0,2})+$' should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = RegEx(`10`, `^([0-9]\d{0,2})+$`)
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`RegEx: string x10 with test '^([0-9]\d{0,2})+$' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = RegEx(`x10`, `^([0-9]\d{0,2})+$`)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`RegEx: string A200 with test '^([0-9]\d{0,2})+$' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = RegEx(`A200`, `^([0-9]\d{0,2})+$`)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`RegEx: string 'The Fast One' with test '^The' should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = RegEx(`The Fast One`, `^The`)
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`RegEx: hex string '#fff' with test '#(?:[a-fA-F0–9]{6}|[a-fA-F0–9]{3})' should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = RegEx(`#fff`, `\\B#(?:[a-fA-F0–9]{6}|[a-fA-F0–9]{3})\\b`)
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`RegEx: hex string '#24ff3o' with test '#(?:[a-fA-F0–9]{6}|[a-fA-F0–9]{3})' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = RegEx(`#24ff3o`, `\\B#(?:[a-fA-F0–9]{6}|[a-fA-F0–9]{3})\\b`)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`RegEx: email 'stevenscloud@live.com' with test '\b[\w.!#$%&’*+\/=?^\`{|}~-]+@[\w-]+(?:\.[\w-]+)*\\b' should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = RegEx(`stevenscloud@live.com`, '\\b[\\w.!#$%&’*+\\/=?^`{|}~-]+@[\\w-]+(?:\\.[\\w-]+)*\\b')
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`RegEx: email 'stevenscloud@live@com' with test '\b[\w.!#$%&’*+\/=?^\`{|}~-]+@[\w-]+(?:\.[\w-]+)*\\b' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = RegEx(`not!valid@#email.com`, '\\b[\\w.!#$%&’*+\\/=?^`{|}~-]+@[\\w-]+(?:\\.[\\w-]+)*\\b')
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`RegEx: value '123' with test '\w' should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = RegEx(`123`, '\\w')
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`RegEx: value '%123' with test '\d/g' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = RegEx(`%123`, '\\d/g')
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    // #endregion

    // #region IsDate
    it (`IsDate: '2019-12-31' with format of 'YYYY-MM-DD' should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsDate('2019-12-31', { format: 'YYYY-MM-DD'})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsDate: '2019-12-31' with format of 'MM-DD-YYYY' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsDate('2019-12-31', { format: 'MM-DD-YYYY'})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsDate: '31-DEC-2019' with format of 'DD-MMM-YYYY' should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsDate('31-DEC-2019', { format: 'DD-MMM-YYYY'})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsDate: '31-DEC-2019T13:44' with format of 'DD-MMM-YYYYTHH:mm' should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsDate('31-DEC-2019T13:44', { format: 'DD-MMM-YYYYTHH:mm'})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsDate: '31-DEC-2019T33:44' with format of 'DD-MMM-YYYYTHH:mm' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsDate('31-DEC-2019T33:44', { format: 'DD-MMM-YYYYTHH:mm'})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsDate: 'not a date' with format of 'DD-MMM-YYYYTHH:mm' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsDate('not a date', { format: 'DD-MMM-YYYYTHH:mm'})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsDate: null with format of 'MM/DD/YYYY' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsDate(null, { format: 'MM/DD/YYYY'})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsDate: '12/31/2019' with format of 'MM/DD/YYYY' should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsDate('12/31/2019', { format: 'MM/DD/YYYY'})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsDate: '12/33/2019' with format of 'MM/DD/YYYY' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsDate('12/33/2019', { format: 'MM/DD/YYYY'})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsDate: '12//31//2019' with format of 'MM/DD/YYYY' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsDate('12//33//2019', { format: 'MM/DD/YYYY'})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsDate: 20191130151522' with format of 'YYYYMMDDHHmmss' should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsDate('20191130151522', { format: 'YYYYMMDDHHmmss'})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsDate: 20191130151522ss' (too many chars) with format of 'YYYYMMDDHHmmss' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsDate('20191130151522ss', { format: 'YYYYMMDDHHmmss'})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsDate: 2019113015152211' (too many chars) with format of 'YYYYMMDDHHmmss' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsDate('2019113015152211', { format: 'YYYYMMDDHHmmss'})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsDate: 20191131151522' (invalid date not 31 days in nov) with format of 'YYYYMMDDHHmmss' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsDate('20191131151522', { format: 'YYYYMMDDHHmmss'})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsDate: 20190229151522' (invalid date not leap year) with format of 'YYYYMMDDHHmmss' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsDate('20190229151522', { format: 'YYYYMMDDHHmmss'})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsDate: 20200229151522' (leap year) with format of 'YYYYMMDDHHmmss' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsDate('20200229151522', { format: 'YYYYMMDDHHmmss'})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    // #endregion

    // #region IsNumber
    it (`IsNumber: 1 should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsNumber(1)
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsNumber: '1' should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsNumber('1')
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsNumber: 'X' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsNumber('X')
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsNumber: '0001' should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsNumber('0001')
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsNumber: null should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsNumber(null)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsNumber: '11000A' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsNumber('11000A')
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsNumber: '1.1' should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsNumber('1.1')
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsNumber: '00' should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsNumber('00')
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsNumber: '0.0' should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsNumber('0.0')
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })

    // #endregion

    // #region IsString
    it (`IsString: 'string' should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsString('string')
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsString: 1 should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsString(1)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsString: null should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsString(null)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsString: undefined should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsString(undefined)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsString: [1] should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsString([1])
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsString: {some: 'object'} should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsString({some: 'object'})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsString: true should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsString(true)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsString: false should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsString(false)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })

    // #endregion

    // #region DateRange
    it (`DateRange: '13-JAN-1987' {min: '19800101', max: '12/31/2050', sourceFormat: 'DD-MMM-YYYY', minFormat: 'YYYYMMDD', maxFormat: 'MM/DD/YYYY'} should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = DateRange('13-JAN-1987', {min: '19800101', max: '12/31/2050', sourceFormat: 'DD-MMM-YYYY', minFormat: 'YYYYMMDD', maxFormat: 'MM/DD/YYYY'})
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`DateRange: '13-JAN-1987' {min: '19900101', max: '12/31/2050', sourceFormat: 'DD-MMM-YYYY', minFormat: 'YYYYMMDD', maxFormat: 'MM/DD/YYYY'} should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = DateRange('13-JAN-1987', {min: '19900101', max: '12/31/2050', sourceFormat: 'DD-MMM-YYYY', minFormat: 'YYYYMMDD', maxFormat: 'MM/DD/YYYY'})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`DateRange: '13-JAN-1987' {min: '19800101', max: '12/31/1985', sourceFormat: 'DD-MMM-YYYY', minFormat: 'YYYYMMDD', maxFormat: 'MM/DD/YYYY'} should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = DateRange('13-JAN-1987', {min: '19800101', max: '12/31/1985', sourceFormat: 'DD-MMM-YYYY', minFormat: 'YYYYMMDD', maxFormat: 'MM/DD/YYYY'})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`DateRange: null {min: '19800101', max: '12/31/1985', sourceFormat: 'DD-MMM-YYYY', minFormat: 'YYYYMMDD', maxFormat: 'MM/DD/YYYY'} should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = DateRange(null, {min: '19800101', max: '12/31/1985', sourceFormat: 'DD-MMM-YYYY', minFormat: 'YYYYMMDD', maxFormat: 'MM/DD/YYYY'})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`DateRange: 'not a date' {min: '19800101', max: '12/31/1985', sourceFormat: 'DD-MMM-YYYY', minFormat: 'YYYYMMDD', maxFormat: 'MM/DD/YYYY'} should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = DateRange('not a date', {min: '19800101', max: '12/31/1985', sourceFormat: 'DD-MMM-YYYY', minFormat: 'YYYYMMDD', maxFormat: 'MM/DD/YYYY'})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`DateRange: '13-JAN-1987' {min: null, max: '12/31/1985', sourceFormat: 'DD-MMM-YYYY', minFormat: 'YYYYMMDD', maxFormat: 'MM/DD/YYYY'} should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = DateRange('13-JAN-1987', {min: null, max: '12/31/1985', sourceFormat: 'DD-MMM-YYYY', minFormat: 'YYYYMMDD', maxFormat: 'MM/DD/YYYY'})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`DateRange: '13-JAN-1987' {min: '19800101', max: null, sourceFormat: 'DD-MMM-YYYY', minFormat: 'YYYYMMDD', maxFormat: 'MM/DD/YYYY'} should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = DateRange('13-JAN-1987', {min: '19800101', max: null, sourceFormat: 'DD-MMM-YYYY', minFormat: 'YYYYMMDD', maxFormat: 'MM/DD/YYYY'})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`DateRange: '13-JAN-1987' {min: '19800101', max: '12/31/1985', sourceFormat: null, minFormat: 'YYYYMMDD', maxFormat: 'MM/DD/YYYY'} should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = DateRange('13-JAN-1987', {min: '19800101', max: '12/31/1985', sourceFormat: null, minFormat: 'YYYYMMDD', maxFormat: 'MM/DD/YYYY'})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`DateRange: '13-JAN-1987' {min: '19800101', max: '12/31/1985', sourceFormat: 'DD-MMM-YYYY', minFormat: null, maxFormat: 'MM/DD/YYYY'} should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = DateRange('13-JAN-1987', {min: '19800101', max: '12/31/1985', sourceFormat: 'DD-MMM-YYYY', minFormat: null, maxFormat: 'MM/DD/YYYY'})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`DateRange: '13-JAN-1987' {min: '19800101', max: '12/31/1985', sourceFormat: 'DD-MMM-YYYY', minFormat: 'YYYYMMDD', maxFormat: null} should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = DateRange('13-JAN-1987', {min: '19800101', max: '12/31/1985', sourceFormat: 'DD-MMM-YYYY', minFormat: 'YYYYMMDD', maxFormat: null})
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })

    // #endregion

    // #region IsInteger
    it (`IsInteger: 1 should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsInteger(1)
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsInteger: '1' should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsInteger('1')
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsInteger: 'X' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsInteger('X')
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsInteger: '0001' should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsInteger('0001')
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsInteger: null should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsInteger(null)
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsInteger: '11000A' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsInteger('11000A')
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsInteger: '1.1' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsInteger('1.1')
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsInteger: '00' should be true`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsInteger('00')
                expect(pass).to.equal(true)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })
    it (`IsInteger: '0.0' should be false`, async() => {
        const result = new Promise(async(resolve, reject) => {
            try {
                const pass = IsInteger('0.0')
                expect(pass).to.equal(false)
                return resolve()
            } catch (err) {
                return reject(err.message)
            }
        })
        return result
    })

    // #endregion
    
})
