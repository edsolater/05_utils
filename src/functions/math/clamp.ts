/**
 * 类似于css的clamp()，目的为：限定值的范围
 * @param  minValue 下限
 * @param  currValue 浮动值（目标值）
 * @param  maxValue 上限
 * @example
 * clamp(2, 40, 80) // 40
 * clamp(2, 90, 80) // 80
 */
export default function clamp(minValue: number, currValue: number, maxValue: number) {
  return Math.min(Math.max(minValue, currValue), maxValue)
}
