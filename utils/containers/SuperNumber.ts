// /**
//  * to formated number string
//  * @example
//  * formatNumber(7000000.2) // result: '7_000_000.200'
//  * formatNumber(8800.1234, { hasPositiveSign: true, seperator: '', fractionLength: 6 }) // result: '+8800.123400'
//  * formatNumber(100.1234, { autoAddZero: false, fractionLength: 3 }) // result: '100.123'
//  */
//  export default function formatNumber(n: number, options: FormatOptions = {}): string {

import { StringNumber } from 'typings/constants'
import isUndefined from '../functions/judgers/isUndefined'
import isBigInt from '../functions/judgers/isBigInt'
import isObjectLike from '../functions/judgers/isObjectLike'

type CalableValue = StringNumber | number | bigint | SuperNumberData

// finalNumber: int * 10 ** exponential / divisor
interface SuperNumberData {
  int: bigint
  exp: bigint
  divisor: bigint
}
interface SuperNumberMethods {
  multi(b: CalableValue): SuperNumber
  divide(b: CalableValue): SuperNumber
}
export interface SuperNumber extends SuperNumberData, SuperNumberMethods {}

/**
 *
 */
function hasSuperNumberShape(v: any): v is SuperNumberData {
  if (!isObjectLike(v)) return false

  const { int, exp: exponential, divisor } = v as SuperNumber
  if (isBigInt(int) && isBigInt(exponential) && isBigInt(divisor)) return true

  return false
}

function SuperNumberData(n: CalableValue): SuperNumberData {
  if (hasSuperNumberShape(n)) return n
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
 * SuperNumber(7000) //=> { int: 7000n, exp: 0n }
 * SuperNumber(3.4) //=> {int: 34n, exp: -1n}
 * SuperNumber(3.14e18) //=> { int: 3140000000000000000n, exp: 0n }
 * SuperNumber(-3.14e-18) //=> { int: -314n, exp: -20n }
 */
export default function SuperNumber(n: CalableValue): SuperNumber {
  const data = SuperNumberData(n)
  const methods = {
    multi: (b: CalableValue) => SuperNumber(_multi(data, SuperNumberData(b))),
    divide: (b: CalableValue) => SuperNumber(_divide(data, SuperNumberData(b)))
  }
  return { ...data, ...methods }
}

const _multi = (a: SuperNumberData, b: SuperNumberData): SuperNumberData => ({
  int: a.int * b.int,
  exp: a.exp + b.exp,
  divisor: a.divisor * b.divisor
})

const _divide = (a: SuperNumberData, b: SuperNumberData): SuperNumberData => ({
  int: a.int * b.divisor,
  exp: a.exp - b.exp,
  divisor: a.divisor * b.int
})

const _add = (a: SuperNumberData, b: SuperNumberData): SuperNumberData => {
  const newA = _changeExp(a, b.exp)
  return {
    int: newA.int * b.divisor + b.int * a.divisor,
    exp: b.exp,
    divisor: newA.divisor * b.divisor
  }
}

const _minus = (a: SuperNumberData, b: SuperNumberData): SuperNumberData => {
  const newA = _changeExp(a, b.exp)
  return {
    int: newA.int * b.divisor - b.int * a.divisor,
    exp: b.exp,
    divisor: newA.divisor * b.divisor
  }
}

const _changeExp = (n: SuperNumberData, toExp: bigint | number): SuperNumberData => {
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

console.log(_changeExp(SuperNumber(3.14), 3))
