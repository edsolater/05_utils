import areSame from './areSame'

/**
 * 函数生成器：表达两个值相等
 */
export default function areSameTo(value: unknown) {
  return (val: unknown) => areSame(value, val)
}
