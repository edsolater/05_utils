import notNullish from './notNullish'

/**
 * (纯函数)
 *
 * 判断是否是`undefined`或`null
 *
 * @param value 目标值
 * @returns 判断结果
 */
export default function isNullish<T>(value: T): value is T extends null | undefined ? T : never {
  return !notNullish(value)
}
