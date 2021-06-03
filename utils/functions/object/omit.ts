import { MayDeepReadOnlyArray } from '../../../typings/tools'
import flat from '../array/flat'

/**
 * 几乎是Typescript的Omit的翻版
 * @param targetObj 需要浅复制的对象
 * @param dismissKeys 需要去除的property（不支持去除sumbol）
 * @returns 已经去除指定key的对象（浅复制得来）
 * @example
 * const obj = { a: 1, b: true }
 * const foo = omit(obj, ['a'])
 * console.log(foo)
 */
export default function omit<T extends object, U extends keyof T>(
  obj: T,
  ...keys: ReadonlyArray<MayDeepReadOnlyArray<U>> //IDEA: maydeep
): Omit<T, U> {
  const newObj = { ...obj }
  flat(keys).forEach((key) => {
    delete newObj[key]
  })
  return newObj
}
