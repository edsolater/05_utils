import objectFilter from './objectFilter'
/**
 * 根据属性，分割对象（以剔除的形式）
 * @param obj 目标对象
 * @param propNameList 属性列表
 * @example
 * kickByPropertyNames({ a: 1, b: 2 }, ['a']) // { b: 2 }
 * @todo 我觉得可以让返回的值的类型有更智能的推导，估计要动objectFilter
 */
export default function kickByPropertyNames<T extends object>(
  obj: T,
  propNameList: Array<keyof T | string>
) {
  return objectFilter(obj, ([key]) => !propNameList.includes(key))
}
