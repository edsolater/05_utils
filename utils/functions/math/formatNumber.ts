import addDefault from '../object/addDefault'
import fall from '../magic/fall'
import { partlyInvoke } from '../functionFactory/partlyInvoke'

type FormatOptions = {
  /**
   * whether positive number should has '+'
   * @default false
   * @example
   * formatNumber(1) // result: '1.000'
   * formatNumber(1, { hasPositiveSign: true }) // result: '+1.000'
   */
  alwaysSign?: boolean
  /**
   * separator symbol
   * @default '_'
   * @example
   * formatNumber(7000000.2) // result: '7_000_000.200'
   * formatNumber(7000000.2, { separator: ',' }) // result: '7,000,000.200'
   */
  separator?: string
  /**
   * whether the number string can shrink or grow
   *
   * (the max length of number is still limited by `fractionLength`)
   * @default true
   * @example
   * formatNumber(100.2, { autoAddZero: true, fractionLength: 3 }) // result: '100.200'
   * formatNumber(100.2, { autoAddZero: false, fractionLength: 3 }) // result: '100.2'
   * formatNumber(100.1234, { autoAddZero: false, fractionLength: 3 }) // result: '100.123'
   */
  autoAddZero?: boolean
  /**
   * how many fraction number. (if there is noting, 0 will be added )
   * @default 3
   * @example
   * formatNumber(100.2, { fractionLength: 3 }) // result: '100.200'
   * formatNumber(100.1234, { fractionLength: 6 }) // result: '100.123400'
   */
  fractionLength?: number
}
const defaultOptions: FormatOptions = {
  separator: '_',
  autoAddZero: true,
  fractionLength: 3
}

/**
 * to formated number string
 * @example
 * formatNumber(7000000.2) // result: '7_000_000.200'
 * formatNumber(8800.1234, { hasPositiveSign: true, seperator: '', fractionLength: 6 }) // result: '+8800.123400'
 * formatNumber(100.1234, { autoAddZero: false, fractionLength: 3 }) // result: '100.123'
 */
export default function formatNumber(n: number, options: FormatOptions = {}): string {
  addDefault(options, defaultOptions)
  console.log(n, options)
  return fall(n, [
    (n) => n.toFixed(options.fractionLength),
    (str) => {
      const [integerPart, fraction] = str.split('.')
      const newIntegerPart = [...integerPart].reduceRight((acc, cur, idx, strN) => {
        const indexFromRight = strN.length - 1 - idx
        const shouldAddSeparator =
          indexFromRight !== 0 && indexFromRight % options.fractionLength! === 0
        return cur + (shouldAddSeparator ? options.separator : '') + acc
      }, '')
      return `${newIntegerPart}.${fraction}`
    },
    (str) => {
      const isPositive = str[0] !== '-' && str[0] !== '0'
      return (isPositive && options.alwaysSign ? '+' : '') + str
    }
  ])
}

/**
 * parse a string
 *
 * it a function that reverse the result of {@link formatNumber}
 * @param numberString a string represent a number. e.g. -70,000.050
 * @example
 * parseFormatedNumberString('-70,000.050') // result: -70000.05
 */
export function parseFormatedNumberString(numberString: string): number {
  const pureNumberString = [...numberString].reduce(
    (acc, char) => acc + (/\d|\.|-/.test(char) ? char : ''),
    ''
  )
  return Number(pureNumberString)
}

/**
 * @mutable
 * (this will mutate original function)
 */
export function addOptions_format(options: FormatOptions): void {
  Object.assign(defaultOptions, options)
}

/**
 * {@link formatNumber.addOptions_mutable}'s immutable version
 */
formatNumber.addOptions = (options: FormatOptions) => partlyInvoke(formatNumber, 1, options)

// #region ------------------- 测试 -------------------
console.log(formatNumber(123456, { alwaysSign: true }))
console.log(formatNumber(7000000.2))
// #endregion
