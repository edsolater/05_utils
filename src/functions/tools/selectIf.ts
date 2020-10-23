//@ts-nocheck
import { lastItem } from 'functions/tools'
import { isFunction } from '../typeGards'

type Value = boolean | number | string | { [key: string]: unknown }

/**
 * 纯函数
 * 有条件地返回（用于简化链式的if）
 * @param conditionPairs 条件与返回值
 */
export default function selectIf<T extends Value>(
  ...conditionPairs: ([condition: boolean | (() => boolean), result: T | (() => T)] | T)[]
): T {
  for (let i = 0; i < conditionPairs.length; i++) {
    const item = Array.isArray(conditionPairs[i]) ? conditionPairs[i] : [true, conditionPairs[i]]
    const [condition, result] = item
    if (isFunction(condition) ? condition() : condition) {
      return isFunction(result) ? result() : result
    }
  }
  const fallbackResult = lastItem(conditionPairs)[1]
  return isFunction(fallbackResult) ? fallbackResult() : fallbackResult
}
