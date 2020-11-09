//@ts-nocheck
import getLastItem from './getLastItem'
import isFunction from './isFunction'


/**
 * (纯函数)
 * 有条件地返回（用于简化链式的if）
 *
 * **最后一句的条件语句其实是装饰用的，不起实际作用**
 * @param conditionPairs 条件与返回值
 * @example
 * chainIf(
 *   [insertStart === 0, 'start'],
 *   [getFirstChar(innerHTML.slice(insertEnd).replace(/<.*?>/g, '')) === '\n', 'end'], // TODO:要封一个clearInnerTag的工具函数
 *   [getLastChar(innerHTML.slice(0, insertStart).replace(/<.*?>/g, '')) === '\n', 'start'],
 *   'middle'
 * ) // 'start' | 'middle' | 'end'
 *
 * chainIf(
 *   [type === 'all-in-column', gridTypeAllInColumn],
 *   [type === 'all-in-row', gridTypeAllInRow]
 * )
 */
export default function chainIf<T>(
  ...conditionPairs: ([condition: boolean | (() => boolean), result: T | (() => T)] | T)[]
): T {
  const newConditionPairs = conditionPairs.map(conditionPair =>
    Array.isArray(conditionPair) ? conditionPair : [true, conditionPair]
  )
  for (const [condition, result] of newConditionPairs) {
    if (isFunction(condition) ? condition() : condition) {
      return isFunction(result) ? result() : result
    }
  }
  const fallbackResult = getLastItem(newConditionPairs)[1]
  return isFunction(fallbackResult) ? fallbackResult() : fallbackResult
}