import { MayDeepArray } from '../../../typings/tools'
/**
 * @example
 * flat(1,[2,3,[4,5,[6]]]) // [1,2,3,4,5,6]
 */
export default function flatMayArray<T>(...values: Array<MayDeepArray<T>>): T[] {
  return values.flat(Infinity)
}
