// /**
//  * to formated number string
//  * @example
//  * formatNumber(7000000.2) // result: '7_000_000.200'
//  * formatNumber(8800.1234, { hasPositiveSign: true, seperator: '', fractionLength: 6 }) // result: '+8800.123400'
//  * formatNumber(100.1234, { autoAddZero: false, fractionLength: 3 }) // result: '100.123'
//  */
//  export default function formatNumber(n: number, options: FormatOptions = {}): string {

import { StringNumber } from 'typings/constants'
import isBigInt from '../functions/judgers/isBigInt'
import isObjectLike from '../functions/judgers/isObjectLike'

type CalableValue = StringNumber | number | bigint | BigNumberData

// finalNumber: int * 10 ** exponential / divisor
interface BigNumberData {
  int: bigint
  exp: bigint
  divisor: bigint
}

interface BigNumberMethods {
  multi(b: CalableValue): BigNumber
  divide(b: CalableValue): BigNumber
  add(b: CalableValue): BigNumber
  minus(b: CalableValue): BigNumber
  toString(option?: ToStringOptions): StringNumber
}

export interface BigNumber extends BigNumberData, BigNumberMethods {}

/**
 *
 */
function containBigNumberData(v: any): v is BigNumberData {
  if (!isObjectLike(v)) return false

  const { int, exp: exponential, divisor } = v as BigNumber
  if (isBigInt(int) && isBigInt(exponential) && isBigInt(divisor)) return true

  return false
}

function BigNumberData(n: CalableValue): BigNumberData {
  if (containBigNumberData(n)) return n
  const strN = String(n)
  const match = strN.match(/^(?<int>[+-]?\d*)(\.(?<decimal>\d+))?(e(?<exp>[+-]?\d+))?$/)
  const { int = '', decimal = '', exp = '' } = match?.groups as any
  return {
    int: BigInt(int + decimal),
    exp: BigInt(exp) - BigInt(decimal.length),
    divisor: BigInt(1)
  }
}

/**
 * @example
 * BigNumber(7000) //=> { int: 7000n, exp: 0n }
 * BigNumber(3.4) //=> {int: 34n, exp: -1n}
 * BigNumber(3.14e18) //=> { int: 3140000000000000000n, exp: 0n }
 * BigNumber(-3.14e-18) //=> { int: -314n, exp: -20n }
 */
function BigNumber(n: CalableValue): BigNumber {
  const data: BigNumberData = BigNumberData(n)
  const methods: BigNumberMethods = {
    multi: (b: CalableValue) => BigNumber(_multi(data, BigNumberData(b))),
    divide: (b: CalableValue) => BigNumber(_divide(data, BigNumberData(b))),
    add: (b: CalableValue) => BigNumber(_add(data, BigNumberData(b))),
    minus: (b: CalableValue) => BigNumber(_minus(data, BigNumberData(b))),
    toString: (options) => _toString(data, options)
  }
  return { ...data, ...methods }
}

const _multi = (a: BigNumberData, b: BigNumberData): BigNumberData => ({
  int: a.int * b.int,
  exp: a.exp + b.exp,
  divisor: a.divisor * b.divisor
})

const _divide = (a: BigNumberData, b: BigNumberData): BigNumberData => ({
  int: a.int * b.divisor,
  exp: a.exp - b.exp,
  divisor: a.divisor * b.int
})

const _add = (a: BigNumberData, b: BigNumberData): BigNumberData => {
  const newA = _changeExp(a, b.exp)
  return {
    int: newA.int * b.divisor + b.int * a.divisor,
    exp: b.exp,
    divisor: newA.divisor * b.divisor
  }
}

const _minus = (a: BigNumberData, b: BigNumberData): BigNumberData => {
  const newA = _changeExp(a, b.exp)
  return {
    int: newA.int * b.divisor - b.int * a.divisor,
    exp: b.exp,
    divisor: newA.divisor * b.divisor
  }
}

const _changeExp = (n: BigNumberData, toExp: bigint | number): BigNumberData => {
  const isBigger = BigInt(toExp) > n.exp
  return isBigger
    ? {
        int: n.int,
        exp: BigInt(toExp),
        divisor: n.divisor * BigInt(10) ** (BigInt(toExp) - n.exp)
      }
    : {
        int: n.int * BigInt(10) ** (n.exp - BigInt(toExp)),
        exp: BigInt(toExp),
        divisor: n.divisor
      }
}

interface ToStringOptions {
  decimalNumber?: number
}
/**
 *
 * @example
 * _toString(BigNumber(-3.1413)) //=> '-3.141'
 * _toString(BigNumber(-3.1418)) //=> '-3.142'
 *
 */
const _toString = (n: BigNumberData, { decimalNumber = 3 }: ToStringOptions = {}): StringNumber => {
  if (decimalNumber === 0) return _toStringWithoutDecimal(n)

  const zeroExpN = _changeExp(n, 0)

  const isNegative = zeroExpN.int < BigInt(0)

  const unsignInt = zeroExpN.int * BigInt(isNegative ? -1 : 1)

  const intPart = String(unsignInt / zeroExpN.divisor)

  const decimalPart = String(
    ((unsignInt - BigInt(intPart) * zeroExpN.divisor) * BigInt(10) ** BigInt(decimalNumber + 1)) /
      zeroExpN.divisor
  ).padStart(decimalNumber + 1, '0')

  // TODO: haven't consider about round-off
  const shrinkedDecimal =
    decimalPart.slice(0, -2) +
    (Number(decimalPart.slice(-2, -1)) + (Number(decimalPart.slice(-1)) >= 5 ? 1 : 0))

  return `${isNegative ? '-' : ''}${intPart}.${shrinkedDecimal}`
}

const _toStringWithoutDecimal = (n: BigNumberData) => {
  // TODO: haven't consider about round-off
  const zeroExpN = _changeExp(n, 0)
  return String((zeroExpN.int * BigInt(10) ** zeroExpN.exp) / zeroExpN.divisor)
}

// console.log(_toString(BigNumber(-3.1413))) //=> '-3.141'
console.log(_toString(BigNumber(-3.02)))
console.log(_toString(BigNumber('3333333.444'), { decimalNumber: 10 }))
console.log(_toString(BigNumber('3.6'), { decimalNumber: 0 }))
