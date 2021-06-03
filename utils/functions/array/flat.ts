import { MayDeepReadOnlyArray } from '../../../typings/tools'
/**
 * 将值包成数组并拍平
 * @param values 需要拍平的值
 * @returns 一维数组
 * @example
 * flat(1,[2,3,[4,5,[6]]]) // [1,2,3,4,5,6]
 */
export default function flat<T>(...values: ReadonlyArray<MayDeepReadOnlyArray<T>>): T[] {
  return values.flat(Infinity)
}
