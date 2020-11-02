/**
 * 基于对象的每一个[key, value]，进行统计操作
 * 类似于array.protoype.reduce
 *
 * @param target 目标对象
 * @param reducer 统计函数
 * @example
 * objectReduce({ a: 1, b: 2 }, (acc, [_, value]) => acc + value, 0) // 3
 */
export default function objectReduce<T extends object, R>(
  obj: T,
  reducer: <U extends keyof T>(
    acc: R,
    currentEntry: [key: U, value: T[U]],
    index: number,
    allEntries: Array<[key: U, value: T[U]]>
  ) => R,
  initialValue: R
): R {
  //@ts-expect-error
  return Object.entries(obj).reduce(reducer, initialValue)
}
