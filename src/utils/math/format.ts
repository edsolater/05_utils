import addDefault from '../object/addDefault'
import applyActions from './applyActions'

/**
 * to formated number string
 * @example
 * format(7000000.2) // result: '7_000_000.200'
 * format(8800.1234, {hasPositiveSign: true, seperator: '', fractionLength: 6}) // result: '+8800.123400'
 * format(100.1234, {autoAddZero: false, fractionLength: 3}) // result: '100.123'
 */
export default function format(
  n: number,
  options: {
    /**
     * whether positive number should has '+'
     * @default false
     * @example
     * format(1) // result: '1.000'
     * format(1, {hasPositiveSign:true}) // result: '+1.000'
     */
    hasSignPlus?: boolean
    /**
     * separator symbol
     * @default '_'
     * @example
     * format(7000000.2) // result: '7_000_000.200'
     * format(7000000.2, {separator: ','}) // result: '7,000,000.200'
     */
    separator?: string
    /**
     * whether the number string can shrink or grow
     *
     * (the max length of number is still limited by `fractionLength`)
     * @default true
     * @example
     * format(100.2, {autoAddZero: true, fractionLength:3}) // result: '100.200'
     * format(100.2, {autoAddZero: false, fractionLength:3}) // result: '100.2'
     * format(100.1234, {autoAddZero: false, fractionLength:3}) // result: '100.123'
     */
    autoAddZero?: boolean
    /**
     * how many fraction number. (if there is noting, 0 will be added )
     * @default 3
     * @example
     * format(100.2, {fractionLength:3}) // result: '100.200'
     * format(100.1234, {fractionLength:6}) // result: '100.123400'
     */
    fractionLength?: number
  } = {}
) {
  addDefault(options, {
    hasSignPlus: false,
    separator: '_',
    autoAddZero: true,
    fractionLength: 3
  })
  const result = applyActions(n, [
    (n) => n.toFixed(options.fractionLength!),
    (str: string) => {
      const [integerPart, fraction] = str.split('.')
      const newIntegerPart = [...integerPart].reduceRight((acc, cur, idx, strN) => {
        const indexFromRight = strN.length - 1 - idx
        const shouldAddSeparator =
          indexFromRight !== 0 && indexFromRight % options.fractionLength! === 0
        return cur + (shouldAddSeparator ? options.separator : '') + acc
      }, '')
      return `${newIntegerPart}.${fraction}`
    },
    (str: string) => {
      const isPositive = str[0] !== '-' && str[0] !== '0'
      return (isPositive && options.hasSignPlus ? '+' : '') + str
    }
  ])
  return result
}
//#region ------------------- 测试 -------------------
// console.log(format(123456, { hasSignPlus: true }))
// console.log(format(7000000.2))
//#endregion
