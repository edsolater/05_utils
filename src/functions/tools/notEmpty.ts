import isEmpty from './isEmpty'

/**
 * 纯函数
 * 判断数组/字符串是否为空
 * @param target 目标数组
 */
export default function notEmpty(target: Iterable<any>): boolean {
  return !isEmpty(target)
}
