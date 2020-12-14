import mergeObjects from './mergeObjects'

/**
 * 插入新的项（返回新对象）
 */
export default function insertProperties<T extends object, U extends object, V>(
  obj: T,
  ...otherObjs: ReadonlyArray<U>
): { [K in keyof T | keyof U]: K extends keyof U ? U[K] : K extends keyof T ? T[K] : never } {
  //@ts-ignore
  return mergeObjects(obj, ...otherObjs)
}
