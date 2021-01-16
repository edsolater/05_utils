//@ts-nocheck
import objectReduce from './objectReduce'

/**
 * 根据属性，分割对象（以划分成两部分的形式）
 * @param obj 目标对象
 * @param propNameList 属性列表
 * @example
 * kickByPropertyNames({ a: 1, b: 2 }, ['a']) // [{ a: 1 }, {hello:2}]
 */
export default function divideByPropertyNames<T extends object, U extends keyof T>(
  obj: T,
  propNameList: ReadonlyArray<U>
): [Pick<T, U>, Omit<T, U>] {
  return objectReduce(
    obj,
    (acc, [key]) => {
      if (propNameList.includes(key)) {
        acc[0][key] = obj[key]
      } else {
        acc[1][key] = obj[key]
      }
      return acc
    },
    [{}, {}]
  )
}
