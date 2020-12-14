import objectFilter from './objectFilter'

/**
 * 根据属性，分割对象（以剔除的形式）
 * @param obj 目标对象
 * @param propNameList 属性列表
 * @example
 * kickByPropertyNames({ a: 1, b: 2 }, ['a']) // { b: 2 }
 */
export default function kickByPropertyNames<T extends object, U extends keyof T>(
  obj: T,
  propNameList: ReadonlyArray<U>
): Omit<T, U> {
  //@ts-expect-error
  return objectFilter(obj, ([key]) => !propNameList.includes(key))
}
