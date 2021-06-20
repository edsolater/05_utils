/**
 * (纯函数)
 * ！！！尽量使用语义更简洁、类型提示更友好的 mapValue 方法替代
 *
 * 基于对象的每一个value，映射， 返回新的对象
 * 该对象有相同的属性数量
 *
 * 类似于array.protoype.map
 * @param target
 * @param mapperFn
 * @example
 * objectMap({ a: 1, b: 2 }, (v) => v * 2) // { a: 2, b: 4 }
 */
export default function objectMap<T extends object, U>(
  target: T,
  mapperFn: (value: T[keyof T], key: keyof T) => U
): { [P in keyof T]: U } {
  //@ts-ignore
  return _objectMapEntry(target, ([key, value]) => [key, mapperFn(value, key)])
}
function _objectMapEntry<T extends object>(
  target: T,
  mapperFn: (entry: [key: keyof T, value: T[keyof T]]) => [key: string, value: any]
) {
  //@ts-ignore
  return Object.fromEntries(Object.entries(target).map(mapperFn))
}
