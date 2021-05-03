import { MayDeepArray } from 'typings/tools'
export type CSSLength = number | string
export type CSSValue = number | string
/**
 * 表示倍率，常用于line-height、brightness()
 */
export type CSSNumber = string
/**
 * TODO css能用数字表示，过于灵活了，不妥。这里有太多的过度设计了。
 */
/**
 * 更新css数值的单位
 * @param val css值
 * @param unit css单位
 * @returns 更新过单位的css字符串值
 * @example
 * changeUnit(400, 'px') // '40px'
 * changeUnit('40px', 'vw') // '40vw'
 */
function changeUnit(val: number | string, unit: string) {
  if (typeof val === 'number') {
    if (val === 0) return '0'
    else return `${val}${unit}`
  } else {
    return `${Number.parseFloat(val)}${unit}`
  }
}


/**
 * 给css变量加上单位（使用css数值的clac+var转换模式，改变数值后无需再通过JS重新固定单位）
 * @param variableName css变量名
 * @param unit 单位
 * @returns 有 calc() 和 var() 的css值
 * @example
 * fn('--x', 'px') // 'calc(var(--x, 0) * 1px)'
 */
export const attachCSSVariableUnit = (variableName: string, unit: 'px' | 'deg' | (string & {})) =>
  `calc(var(${variableName}, 0) * 1${unit})`

export const fromPx = (rule: string): number => parseFloat(rule)

export const toPx = (...ns: MayDeepArray<number | string>[]) =>
  ns
    .flat(Infinity)
    .map((n) => changeUnit(n, 'px'))
    .join(' ')

export const toPer = (...ns: MayDeepArray<number | string>[]) =>
  ns
    .flat(Infinity)
    .map((n) => changeUnit(n, '%'))
    .join(' ')
export const fullVw = '100vw'
export const fullVh = '100vh'
export const halfPer = '50%'
export const fullPer = '100%'
