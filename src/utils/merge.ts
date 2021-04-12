import { MayDeepArray } from 'typings/tools'
import isObject from './judgers/isObject'
import flat from './array/flat'
import { OnlyObject } from '../style/cssParser'
import isArray from './judgers/isArray'

/**
 * 合并多个对象
 * (将数组看作值，实行覆盖)
 * @param deepObjArray 嵌套数组的对象
 * @example
 * mergeDeepObject({a:3, b:2}, {a:1}) // {a:1, b:2}
 * mergeDeepObject({a:3, b:2}, undefined, {a:1}) // {a:1, b:2}
 * mergeDeepObject({a:3, b:2, c:{a:2}}, {a:1, c:{b:3}}) // {a:1, b:2, c:{a:2, b:3}}
 * mergeDeepObject({a:3, b:2, c:{a:2}}, {a:1, c:{b:3}}, false) // {a:1, b:2, c:{a:2, b:3}}
 * mergeDeepObject({a:3, b:2, c:{a:2}}, {a:1, c:{b:3}}, {c:false}) // {a:1, b:2, c:false}
 * mergeDeepObject({a:3, b:2, c:{a:2}}, [{a:1, c:{b:3}}, {c:false}]) // {a:1, b:2, c:false}
 *
 * mergeDeepObject({a:3, b:2, c:[2]}, {a:1, c:[3]}, {c:[4,5]}) // {a:1, b:2, c:[4,5]}
 */
export function mergeDeepObject<T>(...deepObjArray: MayDeepArray<T>[]): OnlyObject<T> {
  const flattedItems = flat(deepObjArray)
  const resultObj = {}
  for (const obj of flattedItems) {
    for (const [key, value] of Object.entries(obj ?? {})) {
      let mergedValue =
        isObject(resultObj[key]) && isObject(value)
          ? mergeDeepObject([resultObj[key], value])
          : value
      resultObj[key] = mergedValue
    }
  }
  //@ts-expect-error
  return resultObj
}

/**
 * 合并多个对象
 * (如果是数组，则合并)
 * @param objDeepArray 嵌套数组的对象
 * @example
 * mergeDeep({a:3, b:2}, {a:1}) // {a:1, b:2}
 * mergeDeep({a:3, b:2}, undefined, {a:1}) // {a:1, b:2}
 * mergeDeep({a:3, b:2, c:{a:2}}, {a:1, c:{b:3}}) // {a:1, b:2, c:{a:2, b:3}}
 * mergeDeep({a:3, b:2, c:{a:2}}, {a:1, c:{b:3}}, false) // {a:1, b:2, c:{a:2, b:3}}
 * mergeDeep({a:3, b:2, c:{a:2}}, {a:1, c:{b:3}}, {c:false}) // {a:1, b:2, c:false}
 * mergeDeep({a:3, b:2, c:{a:2}}, [{a:1, c:{b:3}}, {c:false}]) // {a:1, b:2, c:false}
 *
 * mergeDeep({a:3, b:2, c:[2]}, {a:1, c:[3]}, {c:[4,5]}) // {a:1, b:2, c:[2,3,4,5]}
 */
export function mergeDeep<T>(...objDeepArray: MayDeepArray<T>[]): OnlyObject<T> {
  const flattedItems = flat(objDeepArray)
  const resultObj = {}
  for (const obj of flattedItems) {
    for (const [key, value] of Object.entries(obj ?? {})) {
      let mergedValue =
        isArray(resultObj[key]) && isArray(value)
          ? [...resultObj[key], ...value]
          : isObject(resultObj[key]) && isObject(value)
          ? mergeDeep([resultObj[key], value])
          : value
      resultObj[key] = mergedValue
    }
  }
  //@ts-expect-error
  return resultObj
}
