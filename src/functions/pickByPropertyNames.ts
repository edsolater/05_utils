import objectFilter from './objectFilter'

/**
 * 根据属性，分割对象（以采集形式）（返回新对象）
 * @param obj 目标对象
 * @param propNameList 属性列表
 * @example
 * pickByPropertyName({ a: 1, b: 2 }, ['a']) // { a: 1 }
 * @todo 我觉得可以让返回的值的类型有更智能的推导，估计要动objectFilter
 */
export default function pickByPropertyNames<T extends object>(
  obj: T,
  propNameList: ReadonlyArray<keyof T>
) {
  return objectFilter(obj, ([key]) => propNameList.includes(key))
}
