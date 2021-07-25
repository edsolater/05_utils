import isObject from '../judgers/isObject'
import { objectMapEntry } from './objectMap'

/**
 *  this tool function must specifiy it's return type manually
 * @example
 * renameObjectKeys({ hello: 3, world: 2, deep: { hello: 'inner' }, { hello: 'ww' }) //=> { ww: 3, world: 2, deep: { ww: 'inner' } }
 * renameObjectKeys({ hello: 3, world: 2, deep: { hello: 'inner' }, [['hello', 'ww']]) //=> { ww: 3, world: 2, deep: { ww: 'inner' } }
 * renameObjectKeys({ hello: 3, world: 2, deep: { hello: 'inner' }, new Map([['hello', 'ww']])) //=> { ww: 3, world: 2, deep: { ww: 'inner' } }
 */
export default function renameObjectKeys<T = any>(
  obj: any,
  renameMap: { [originalName: string]: string } | Map<string, string> | [string, string][]
): T {
  if (!isObject(obj)) return obj
  const remap = new Map(isObject(renameMap) ? Object.entries(renameMap) : renameMap)
  // @ts-expect-error it's impossible to infer correct. But, never mind
  return objectMapEntry(obj, ([key, value]) => [
    remap.get(key) ?? key,
    isObject(value) ? renameObjectKeys(value, renameMap) : value
  ])
}
