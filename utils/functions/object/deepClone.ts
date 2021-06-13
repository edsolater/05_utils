import isObjectLike from '../judgers/isObjectLike'

/**
 * 克隆对象
 * @todo 给这个函数写测试，而且也没考虑到数组的特殊性
 * @param inputObject
 * @returns
 */
export default function deepClone<T>(inputObject: T): T {
  // @ts-ignore
  return Object.fromEntries(
    Object.entries(inputObject).map(([key, value]) => [
      key,
      isObjectLike(value) ? deepClone(value) : value
    ])
  )
}
