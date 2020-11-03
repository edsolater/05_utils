import objectReduce from "./objectReduce"

/**
 * 根据属性，分割对象（以划分成两部分的形式）
 * @param obj 目标对象
 * @param propNameList 属性列表
 * @example
 * kickByPropertyNames({ a: 1, b: 2 }, ['a']) // [{ a: 1 }, {hello:2}]
 * @todo 我觉得可以让返回的值的类型有更智能的推导
 */
export default function divideByPropertyNames<T extends object>(
  obj: T,
  propNameList: ReadonlyArray<keyof T | string>
): [Partial<T>, Partial<T>] {
  return objectReduce(
    obj,
    (acc, [key]) => {
      if (propNameList.includes(key)) {
        //@ts-expect-error
        acc[0][key] = obj[key]
      } else {
        //@ts-expect-error
        acc[1][key] = obj[key]
      }
      return acc
    },
    [{}, {}]
  )
}
