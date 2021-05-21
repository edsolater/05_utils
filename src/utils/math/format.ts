import addDefault from '../object/addDefault'
import applyActions from './applyActions'
import { partlyInvoke } from '../functionFactory/partlyInvoke'

type FormatOptions = {
  /**
   * whether positive number should has '+'
   * @default false
   * @example
   * format(1) // result: '1.000'
   * format(1, { hasPositiveSign: true }) // result: '+1.000'
   */
  alwaysSign?: boolean
  /**
   * separator symbol
   * @default '_'
   * @example
   * format(7000000.2) // result: '7_000_000.200'
   * format(7000000.2, { separator: ',' }) // result: '7,000,000.200'
   */
  separator?: string
  /**
   * whether the number string can shrink or grow
   *
   * (the max length of number is still limited by `fractionLength`)
   * @default true
   * @example
   * format(100.2, { autoAddZero: true, fractionLength: 3 }) // result: '100.200'
   * format(100.2, { autoAddZero: false, fractionLength: 3 }) // result: '100.2'
   * format(100.1234, { autoAddZero: false, fractionLength: 3 }) // result: '100.123'
   */
  autoAddZero?: boolean
  /**
   * how many fraction number. (if there is noting, 0 will be added )
   * @default 3
   * @example
   * format(100.2, { fractionLength: 3 }) // result: '100.200'
   * format(100.1234, { fractionLength: 6 }) // result: '100.123400'
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
 * format(7000000.2) // result: '7_000_000.200'
 * format(8800.1234, { hasPositiveSign: true, seperator: '', fractionLength: 6 }) // result: '+8800.123400'
 * format(100.1234, { autoAddZero: false, fractionLength: 3 }) // result: '100.123'
 */
export default function format(n: number, options: FormatOptions = {}): string {
  addDefault(options, defaultOptions)
  console.log(n, options)
  return applyActions(n, [
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
 * @mutable
 * (this will mutate original function)
 */
format.addOptions_mutable = (options: FormatOptions): void => {
  Object.assign(defaultOptions, options)
}

/**
 * @immutable
 * {@link format.addOptions_mutable}'s immutable version
 */
format.addOptions = (options: FormatOptions) => partlyInvoke(format, 1, options)

// #region ------------------- 测试 -------------------
console.log(format(123456, { alwaysSign: true }))
console.log(format(7000000.2))
export type AnyFn = (...args: any[]) => void

// #endregion
type AddOptions<F, Options> = F & { addOptions(options?: Options): AddOptions<F, Options> }

/**
 *
 * add new property: addOptions([options]) to input function.
 * configedProcesser is a function with options setted.
 * but it's type is same as input function.
 *
 *
 * default options type  will be the last param of input function.
 * (you can specify the type manually)
 *
 * @example
 * const foo = makeFunctionCanReturnConfigedProcessor(format)
 * const newFormat = foo.addOptions({ separator: '$$' })
 * console.log(newFormat(123456, { alwaysSign: true }))  // same as : format(123456, {separator: '$$', alwaysSign: true})
 */
function makeFunctionCanReturnConfigedProcessor<
  Options extends Parameters<F>[-1],
  F extends AnyFn = AnyFn
>(pureFunc: F): AddOptions<F, Options> {
  const addOptions = (options?: Options) =>
    //@ts-ignore
    makeFunctionCanReturnConfigedProcessor(function configedFn(...args: Required<Parameters<F>>) {
      const newArgs = [
        ...args.slice(0, args.length),
        {
          ...options,
          ...(typeof args[args.length - 1] === 'object' ? args[args.length - 1] : undefined) // TODO: 这个判断有点粗糙
        }
      ]
      return pureFunc(...newArgs)
    })
  pureFunc[addOptions.name] = addOptions
  //@ts-ignore
  return pureFunc
}
