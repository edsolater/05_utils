import notNullish from './notNullish'

/**
 * 类别：typegard 
 * 
 * 
 * @param value 目标值
 */
export default function isNullish<T>(value: T): value is T extends null | undefined ? T : never {
  return !notNullish(value)
}
