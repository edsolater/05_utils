import { NotFunctionValue, Primitive } from '../../../typings/constants'
import shrinkToValue from './shrinkToValue'

// TODO: It's type generic is not correct
/**
 * this Function can generally replace javascript:switch
 *
 * @param value detected value
 * @param conditionPairs conditions (one of them or none of them can match). this's returned Value must have same type.
 * @param fallbackValue
 * @example
 * parallelSwitch('hello', [
 *   [(k) => k.charAt(0) === 'h', 3],
 *   ['world', 4]
 * ]) //=> 3
 */
export default function parallelSwitch<
  Base,
  Value extends Primitive // this type is not correct
>(
  value: Base,
  conditionPairs: Array<
    [
      is: NotFunctionValue | ((value: Base) => boolean),
      returnValue: Value | ((value: Base) => Value)
    ]
  >,
  fallbackValue?: Value
): Value {
  for (const [is, returnValue] of conditionPairs) {
    if (value === is || shrinkToValue(is, [value]) === true)
      return shrinkToValue(returnValue, [value])
  }
  return fallbackValue!
}

//#region ------------------- 测试 -------------------
// const a = parallelSwitch('hello', [
//   ['world', 1],
//   ['hello', 4]
// ])
// console.log('a: ', a)
//#endregion
