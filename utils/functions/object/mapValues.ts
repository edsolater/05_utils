/**
 * (纯函数)
 *
 * 基于对象的每一个value，映射， 返回新的对象
 * 该对象有相同的键名
 *
 * @param obj 目标对象
 * @param mapperFn 映射函数
 * @example
 * mapValues({ a: 1, b: 2 }, (n) => n ** 2) // { a: 2, b: 4 }
 */
export default function mapValues<T extends object, U extends keyof T, Returned>(
  obj: T,
  mapperFn: (value: T[U], key: U) => Returned
): { [key in U]: Returned } {
  //@ts-expect-error
  return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, mapperFn(value, key)]))
}
