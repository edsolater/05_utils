import { NotFunctionValue, Primitive } from '../../../typings/constants'
import { shrinkToValue } from './shrinkToValue'

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
  Input,
  Value extends Primitive, // this type is not correct
  FallbackValue
>(
  value: Input,
  conditionPairs: Array<
    [
      is: NotFunctionValue | ((value: Input) => boolean),
      returnValue: Value | ((value: Input) => Value)
    ]
  >,
  fallbackValue?: FallbackValue
): NotFunctionValue extends Input ? Value : Value | FallbackValue {
  for (const [is, returnValue] of conditionPairs) {
    if (value === is || shrinkToValue(is, [value]) === true)
      return shrinkToValue(returnValue, [value])
  }
  // @ts-ignore
  return fallbackValue
}

//#region ------------------- 测试 -------------------
// const a = parallelSwitch('hello', [
//   ['world', 1],
//   ['hello', 4]
// ])
// console.log('a: ', a)
//#endregion
