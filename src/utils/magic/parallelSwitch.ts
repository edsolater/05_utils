import { NotFunctionValue, Primitive } from 'typings/constants'
import { shrinkToValue } from './shrinkToValue'

/**
 * this Function can generally replace javascript:switch
 *
 * @param value detected value
 * @param conditionPairs conditions (one of them or none of them can match). this's returned Value must have same type.
 * @param fallbackValue
 * @returns
 */
export default function parallelSwitch<
  Input,
  Value extends Primitive, // this type is not correct
  FallbackValue = undefined
>(
  value: Input,
  conditionPairs: ReadonlyArray<
    [is: NotFunctionValue | ((value: Input) => boolean), returnValue: Value | (() => Value)]
  >,
  fallbackValue?: FallbackValue
): NotFunctionValue extends Input ? Value : Value | FallbackValue {
  for (const [is, returnValue] of conditionPairs) {
    // @ts-expect-error FIXME: it's a bug
    if (value === is || is === true || shrinkToValue(is, [value]) === true) return shrinkToValue(returnValue)
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
