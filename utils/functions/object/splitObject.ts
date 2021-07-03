import { AnyObj } from 'typings/constants'
import { isFunction } from '../judgers'
import objectReduce from './objectReduce'

/**
 * 根据属性，分割对象（以划分成两部分的形式）
 * @param obj 目标对象
 * @param propNameList 属性列表
 * @example
 * splitObject({ a: 1, b: 2 }, ['a']) // [{ a: 1 }, { b: 2 }]
 */
export default function splitObject<T extends AnyObj>(
  obj: T,
  judger: (key:keyof T, value:T[keyof T]) => boolean
): [Partial<T>, Partial<T>]
export default function splitObject<T extends AnyObj, U extends keyof T>(
  obj: T,
  propNameList: ReadonlyArray<U>
): [Pick<T, U>, Omit<T, U>]
export default function splitObject(obj, param2) {
  return objectReduce(
    obj,
    (acc, [key, value]) => {
      const groupNo = (isFunction(param2) ? param2(key, value) : param2.includes(key)) ? 0 : 1
      const targetBucket = acc[groupNo] as any
      targetBucket[key] = obj[key]
      return acc
    },
    [{}, {}]
  )
}
