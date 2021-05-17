import objectMap from 'utils/object/objectMap'
import addDefault from '../object/addDefault'

type NotFunction<T> = Exclude<T, (...args: any[]) => void>
type OnlyFunction<T> = Extract<T, (...args: any[]) => void>
type ValueOrCallbackValue<Value extends NotFunction<any>> =
  | Value
  | ((originalData: number) => Value)

const makePureValue = <T>(
  value: T,
  functionParameters: Parameters<OnlyFunction<T>>
): NotFunction<T> => {
  return typeof value === 'function' ? value(...functionParameters) : value
}

/**
 * form number to formated number string
 * @example
 * format(1000.2) // '1_000.2
 */
export default function format(
  n: number,
  options: {
    /**
     * split symbol
     * @default '_'
     */
    saperator?: ValueOrCallbackValue<string>
    /**
     * how many fraction number. (if there is noting, 0 will be added )
     * @default 3
     */
    fractionLength?: ValueOrCallbackValue<number>
  } = {}
): string {
  objectMap(addDefault(options, { saperator: '_', fractionLength: 3 }))
  return Math.sqrt(dx ** 2 + dy ** 2)
}
