import { hasProperty, isBigInt, isNumber, isString } from '../functions/judgers'
import isObjectLike from '../functions/judgers/isObjectOrArray'

// TODO: to be continue...

type Numberable = number | string | bigint
type StringNumberable = Numberable | StringNumberAtom
type StringNumber = string
type StringNumberAtom = { decimal: number; all: string }

const stringNumberRegex = /-?\d*\.?\d+/

export function canTransformToStringNumber(value: any): value is Numberable {
  return isNumber(value) || isBigInt(value) || (isString(value) && stringNumberRegex.test(value))
}

export function isStringNumberAtom(value: any): value is StringNumberAtom {
  return isObjectLike(value) && hasProperty(value, ['decimal', 'all'])
}

/**
 * @convention number element = decimal + getAllNumber
 * @example
 *  '423.12' => { decimal: 2, allNumber: '42312' }
 *  '12' => { decimal: 0, allNumber: '12' }
 */
export function toStringNumberAtom(from: Numberable | StringNumberAtom): StringNumberAtom {
  if (isStringNumberAtom(from)) return from
  const str = toStringNumber(from)
  const [intPart = '', decimalPart = ''] = str.split('.')
  return { decimal: decimalPart.length, all: intPart + decimalPart } as StringNumberAtom
}

/**
 * @example
 * getStringNumber('sd5587.65fjf') //=> '5587.65'
 * getStringNumber('hello') //=> ''
 * getStringNumber(3) //=> '3'
 * getStringNumber('8n') //=> '8'
 *  { decimal: 2, allNumber: '42312' } => '423.12'
 *  { decimal: 0, allNumber: '12' } = '12'
 */
function toStringNumber(from: StringNumberable): StringNumber {
  if (isNumber(from)) return String(from)
  if (isBigInt(from)) return String(from)
  if (isStringNumberAtom(from)) {
    const { decimal, all } = from
    if (decimal === 0) return all
    return [all.slice(0, -decimal), '.', all.slice(-decimal)].join('')
  }
  const parsedString = from.match(stringNumberRegex)?.[0] ?? ''
  return parsedString
}

//#region ------------------- basic math -------------------

/**
 * @example
 * padZero('30', 3)
 */
function _padZero(str: string, count: number) {
  return str + Array(count).fill('0').join('')
}
/**
 * @example
 * add('9007199254740991.4', '112.4988') //=> '9007199254741103.8988'
 */
export function add(a: Numberable, b: Numberable) {
  const { decimal: decimalA, all: allA } = toStringNumberAtom(a)
  const { decimal: decimalB, all: allB } = toStringNumberAtom(b)

  const biggerDecimal = Math.max(decimalB, decimalA)

  return toStringNumber({
    decimal: biggerDecimal,
    all: String(
      BigInt(_padZero(allA, biggerDecimal - decimalA)) +
        BigInt(_padZero(allB, biggerDecimal - decimalB))
    )
  })
}

/**
 * @example
 * minus('1.22', '112.3') //=> '-111.08'
 * minus('1.22', '-112.3') //=> '-111.08'
 * minus('9007199254740991.4', '112.4988') //=> '9007199254740878.9012'
 */
export function minus(a: Numberable, b: Numberable) {
  const { decimal: decimalA, all: allA } = toStringNumberAtom(a)
  const { decimal: decimalB, all: allB } = toStringNumberAtom(b)

  const biggerDecimal = Math.max(decimalB, decimalA)

  return toStringNumber({
    decimal: biggerDecimal,
    all: String(
      BigInt(_padZero(allA, biggerDecimal - decimalA)) -
        BigInt(_padZero(allB, biggerDecimal - decimalB))
    )
  })
}

/**
 * @example
 * multiply('1.22', '112.3') //=> '137.006'
 * multiply('9007199254740991.4', '112.4988') //=> '1013299107519255843.31032'
 */
export function multiply(a: Numberable, b: Numberable) {
  const { decimal: decimalA, all: allA } = toStringNumberAtom(a)
  const { decimal: decimalB, all: allB } = toStringNumberAtom(b)
  return toStringNumber({
    decimal: decimalA + decimalB,
    all: String(BigInt(allA) * BigInt(allB))
  })
}

export function divide(
  a: Numberable,
  b: Numberable,
  { decimalPlace = 20 }: { decimalPlace?: number } = {}
) {
  const { decimal: decimalA, all: allA } = toStringNumberAtom(a)
  const { decimal: decimalB, all: allB } = toStringNumberAtom(b)
  return toStringNumber({
    decimal: decimalA - decimalB + decimalPlace,
    all: String(BigInt(_padZero(allA, decimalPlace)) / BigInt(allB))
  })
}

//#endregion

console.log(Number.MAX_SAFE_INTEGER)
console.log(minus('1.22', '-112.3'))
console.log(minus('-9007199254740991.4', '112.4988'))
console.log(divide('30.3', 3))
