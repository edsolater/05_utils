import notNullish from '../notNullish'

/**
 * 判断是否是`undefined`或`null
 *
 * @param value 目标值
 * @returns 判断结果
 */
export default function isNullish(value: unknown): value is undefined | null {
  return !notNullish(value)
}
