/**
 * (纯函数)
 * ！！！尽量使用语义更简洁、类型提示更友好的 mapValue 方法替代
 *
 * 基于对象的每一个value，映射， 返回新的对象
 * 该对象有相同的属性数量
 *
 * 类似于array.protoype.map
 * @param target target object
 * @param mapper (value)
 * @example
 * objectMap({ a: 1, b: 2 }, (v) => v * 2) // { a: 2, b: 4 }
 */
export default function objectMap<T extends object, V>(
  target: T,
  mapper: (value: T[keyof T], key: keyof T) => V
): { [P in keyof T]: V } {
  //@ts-ignore
  return objectMapEntry(target, ([key, value]) => [key, mapper(value, key)])
}

export function objectMapKey<T extends object, K extends keyof any>(
  target: T,
  mapper: (key: keyof T, value: T[keyof T]) => K
): { [P in K]: T[keyof T] } {
  //@ts-ignore
  return objectMapEntry(target, ([key, value]) => [mapper(key, value), value])
}

export function objectMapEntry<T extends object>(
  target: T,
  mapper: (entry: [key: keyof T, value: T[keyof T]]) => [key: string, value: any]
) {
  //@ts-ignore
  return Object.fromEntries(Object.entries(target).map(mapper))
}
