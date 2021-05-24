import { NotFunctionValue, Primitive } from 'typings/constants'
import { getValue } from './getValue'

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
  Value extends Primitive | object,
  FallbackValue = undefined
>(
  value: Input,
  conditionPairs: ReadonlyArray<
    [is: NotFunctionValue | ((value: Input) => boolean), returnValue: Value | (() => Value)]
  >,
  fallbackValue?: FallbackValue
): Value | FallbackValue {
  for (const [is, returnValue] of conditionPairs) {
    if (value === is || is === true || getValue(is, [value]) === true) return getValue(returnValue)
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
