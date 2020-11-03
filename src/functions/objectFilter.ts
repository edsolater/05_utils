/**
 * (纯函数)
 *
 * 基于对象的每一个value，筛选， 返回新的对象
 * 更少的属性数量
 *
 * 类似于array.protoype.filter
 *
 * @param obj 目标对象
 * @param judger 映射函数
 * @example
 * objectFilter({ a: 1, b: 2 }, ([, value]) => value > 1) // { b: 2 }
 */
export default function objectFilter<T extends object>(
  obj: T,
  judger: <U extends keyof T>(entry: [key: U, value: T[U]], index: number, obj: T) => boolean
):Partial<T> {
  //@ts-ignore
  return Object.fromEntries(Object.entries(obj).filter(judger))
}
