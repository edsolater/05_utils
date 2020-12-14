import mergeObjects from './mergeObjects'

/**
 * 插入新的项（返回新对象）
 */
export default function insertEntries<T extends object, U extends keyof any, V>(
  obj: T,
  ...entries: ReadonlyArray<[key: U, value: V]>
): { [K in keyof T | U]: K extends keyof T ? T[K] : V } {
  //@ts-ignore
  return mergeObjects(obj, Object.fromEntries(entries))
}
