import { lastItem } from 'functions/tools'
import { isFunction } from '../typeGards'

/**
 * 纯函数
 * 有条件地返回（用于简化链式的if）
 * @param conditionPairs 条件与返回值
 */
export default function rf<T extends boolean | number | string | object>(
  ...conditionPairs: [condition: boolean | (() => boolean), result: T | (() => T)][]
): T {
  for (let i = 0; i < conditionPairs.length; i++) {
    const [condition, result] = conditionPairs[i]
    if (isFunction(condition) ? condition() : condition) {
      return isFunction(result) ? result() : result
    }
  }
  const fallbackResult = lastItem(conditionPairs)[1]
  return isFunction(fallbackResult) ? fallbackResult() : fallbackResult
}
