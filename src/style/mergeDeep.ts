import { MayDeepArray } from 'typings/tools'
import isObject from 'utils/judgers/isObject'
import flat from 'utils/array/flat'
import { OnlyObject } from './cssParser'

// TODO: 这并没有考虑数组的合并问题
/**
 * 合并嵌套数组的对象
 * @param objDeepArray 嵌套数组的对象
 * @example
 * mergeDeep([{a:3,b:2}, {a:1}]) // {a:1, b:2}
 * mergeDeep([{a:3, b:2, c:{a:2}}, {a:1, c:{b:3}}]) // {a:1, b:2, c:{a:2, b:3}}
 * mergeDeep([{a:3, b:2, c:{a:2}}, {a:1, c:{b:3}}, false]) // {a:1, b:2, c:{a:2, b:3}}
 * mergeDeep([{a:3, b:2, c:{a:2}}, {a:1, c:{b:3}}, {c:false}]) // {a:1, b:2, c:false}
 * mergeDeep([{a:3, b:2, c:{a:2}}, [{a:1, c:{b:3}}, {c:false}]]) // {a:1, b:2, c:false}
 */
export function mergeDeep<T>(objDeepArray: MayDeepArray<T>): OnlyObject<T> {
  const resultObj = {}
  for (const obj of flat(objDeepArray)) {
    for (const [key, value] of Object.entries(obj ?? {})) {
      let mergedValue =
        isObject(resultObj[key]) && isObject(value) ? mergeDeep([resultObj[key], value]) : value
      resultObj[key] = mergedValue
    }
  }
  //@ts-expect-error
  return resultObj
}
