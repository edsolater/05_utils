import objectFilter from './objectFilter'

/**
 * 删除对象的所有undefined属性，
 * 就是非undifined版的objectFilter
 * @param obj 目标对象
 * @todo 可选地提供判定为不必要的判定函数
 */
export default function clearObjectUndefined<T extends object, K extends keyof T>(
  obj: T
): { [P in K extends undefined ? never : K]: T[P] } {
  //@ts-ignore
  return objectFilter(obj, ([_, value]) => value !== undefined)
}