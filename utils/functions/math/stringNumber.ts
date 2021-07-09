import { isBigInt, isNumber } from '../judgers'

// TODO: to be continue...

type Numberable = number | string | bigint
type StringNumberAtom = { decimal: number; all: string }

/**
 * @example
 * getStringNumber('sd5587.65fjf') //=> '5587.65'
 * getStringNumber('hello') //=> ''
 * getStringNumber(3) //=> '3'
 * getStringNumber('8n') //=> '8'
 */
export function parseStringNumber(from: number | string | bigint) {
  if (isNumber(from)) return String(from)
  if (isBigInt(from)) return String(from)
  const parsedString = from.match(/-?\d*\.?\d+/)?.[0] ?? ''
  return parsedString
}

/**
 * @convention number element = decimal + getAllNumber
 * @example
 *  '423.12' => { decimal: 2, allNumber: '42312' }
 *  '12' => { decimal: 0, allNumber: '12' }
 */
export function parseFromStringNumber(from: Numberable) {
  const str = parseStringNumber(from)
  const [intPart = '', decimalPart = ''] = str.split('.')
  return { decimal: decimalPart.length, all: intPart + decimalPart } as StringNumberAtom
}

/**
 * @alias dismantleFromStringNumber
 */
export function getStringNumberAtom(...params: Parameters<typeof parseFromStringNumber>) {
  return parseFromStringNumber(...params)
}

/**
 * @example
 *  { decimal: 2, allNumber: '42312' } => '423.12'
 *  { decimal: 0, allNumber: '12' } = '12'
 */
export function toStringNumber({ decimal, all }: StringNumberAtom) {
  if (decimal === 0) return all
  return [all.slice(0, -decimal), '.', all.slice(-decimal)].join('')
}

/**
 * @alias toStringNumber
 */
export function composeStringNumberAtom(...params: Parameters<typeof toStringNumber>) {
  return toStringNumber(...params)
}

//#region ------------------- basic math -------------------

/**
 * @example
 * padZero('30', 3)
 */
function padZero(str: string, count: number) {
  return str + Array(count).fill('0').join('')
}
/**
 * @example
 * add('9007199254740991.4', '112.4988') //=> '9007199254741103.8988'
 */
export function add(a: Numberable, b: Numberable) {
  const { decimal: decimalA, all: allA } = getStringNumberAtom(a)
  const { decimal: decimalB, all: allB } = getStringNumberAtom(b)

  const biggerDecimal = Math.max(decimalB, decimalA)

  return toStringNumber({
    decimal: biggerDecimal,
    all: String(
      BigInt(padZero(allA, biggerDecimal - decimalA)) +
        BigInt(padZero(allB, biggerDecimal - decimalB))
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
  const { decimal: decimalA, all: allA } = getStringNumberAtom(a)
  const { decimal: decimalB, all: allB } = getStringNumberAtom(b)

  const biggerDecimal = Math.max(decimalB, decimalA)

  return toStringNumber({
    decimal: biggerDecimal,
    all: String(
      BigInt(padZero(allA, biggerDecimal - decimalA)) -
        BigInt(padZero(allB, biggerDecimal - decimalB))
    )
  })
}

/**
 * @example
 * multiply('1.22', '112.3') //=> '137.006'
 * multiply('9007199254740991.4', '112.4988') //=> '1013299107519255843.31032'
 */
export function multiply(a: Numberable, b: Numberable) {
  const { decimal: decimalA, all: allA } = getStringNumberAtom(a)
  const { decimal: decimalB, all: allB } = getStringNumberAtom(b)
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
  const { decimal: decimalA, all: allA } = getStringNumberAtom(a)
  const { decimal: decimalB, all: allB } = getStringNumberAtom(b)
  // TODO
}

//#endregion

console.log(Number.MAX_SAFE_INTEGER)
console.log(minus('1.22', '-112.3'))
console.log(minus('9007199254740991.4', '112.4988'))
