import omit from './omit'
import pick from './pick'

/**
 * 根据属性，分割对象（以采集形式）（返回两个新对象）
 * @param obj 目标对象
 * @param propNameList 属性列表
 * @example
 * separate({ a: 1, b: 2 }, ['a']) // [{ a: 1 }, { b: 2 }]
 */
export default function separate<T extends object, U extends keyof T>(
  obj: T,
  propNameList: ReadonlyArray<U>
): [Omit<T, U>, Pick<T, U>] {
  return [omit(obj, propNameList), pick(obj, propNameList)]
}
