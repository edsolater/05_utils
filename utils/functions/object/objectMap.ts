import type { Keyof, SKeyof, SValueof } from 'typings/tools'

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
export default function objectMap<T, V>(
  target: T,
  mapper: (value: SValueof<T>, key: SKeyof<T>) => V
): { [P in keyof T]: V } {
  //@ts-ignore
  return objectMapEntry(target ?? {}, ([key, value]) => [key, mapper(value, key)])
}

export const objectMapValue = objectMap

export function objectMapKey<T, K extends string>(
  target: T,
  mapper: (key: SKeyof<T>, value: SValueof<T>) => K
): { [P in Keyof<T> as K]: T[P] } {
  //@ts-ignore
  return objectMapEntry(target ?? {}, ([key, value]) => [mapper(key, value), value])
}

export function objectMapEntry<T>(
  target: T,
  mapper: (
    entry: [key: SKeyof<T>, value: SValueof<T>]
  ) => [key: string | number | symbol, value: any]
) {
  //@ts-ignore
  return Object.fromEntries(Object.entries(target ?? {}).map(mapper))
}

export function objectFlatMapEntry<T>(
  target: T,
  flatMapper: (entry: [key: SKeyof<T>, value: SValueof<T>]) => any[]
): any {
  //@ts-ignore
  return Object.fromEntries(Object.entries(target ?? {}).flatMap(flatMapper)) as any
}
