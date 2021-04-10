import objectFilter from './objectFilter'

/**
 * 根据属性，分割对象（以采集形式）（返回新对象）
 * @param obj 目标对象
 * @param propNameList 属性列表
 * @example
 * pickByPropertyName({ a: 1, b: 2 }, ['a']) // { a: 1 }
 */
export default function pick<T extends object, U extends keyof T>(
  obj: T,
  propNameList: ReadonlyArray<U>
): Pick<T, U> {
  //@ts-expect-error
  return objectFilter(obj, ([key]) => propNameList.includes(key))
}
