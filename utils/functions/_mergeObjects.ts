import { ObjectNotArray } from "typings/constants"

/**
 * （这只是个基础框架，没多少实用价值，需要包装成更强的函数）
 * 合并多个对象
 * @example
 * mergeObjects([{a: 3, b: 2}, {a: 1}]) // {a: 1, b: 2}
 * mergeObjects([{a: 3, b: 2}, {a: 1, b: 3}], (key, v1, v2) => (key === 'a') ? [v1, v2] : v2) // {a: [3,1], b: 3}
 */
 export function _mergeObjects<T extends ObjectNotArray>(
  objs: T[],
  transformer: (key: string, valueA: unknown, valueB: unknown) => unknown
): T {
  //@ts-ignore
  if (objs.length === 0) return {}
  if (objs.length === 1) return objs[0]

  const resultObj: any = { ...objs[0] }
  for (const obj of objs.slice(1)) {
    for (const [key, valueB] of Object.entries(obj)) {
      const valueA = resultObj[key]
      const resultValue = transformer(key, valueA, valueB)
      if (resultValue !== undefined) resultObj[key] = resultValue
    }
  }
  return resultObj
}

// const a = mergeObjects(
//   [
//     { a: 3, b: 2 },
//     { a: 1, b: 3 }
//   ],
//   (key, v1, v2) => {
//     return key === 'a' ? [v1, v2] : v2
//   }
// )