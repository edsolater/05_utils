import { MayDeepArray } from 'typings/tools'
import isArray from 'utils/judgers/isArray'
import isNumber from 'utils/judgers/isNumber'
import isString from 'utils/judgers/isString'
export type CSSLength = number | string
export type CSSValue = number | string
export type CSSLongValue = CSSValue | CSSValue[]
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
 * 使数值变成css值
 * @param n css值
 * @returns css字符串值
 * @example
 * toCSS(0) // '0'
 * toCSS(1) // '1px'
 * toCSS('2') // '2px'
 * toCSS('2px') // '2px'
 * toCSS('2vw') // '2vw'
 * toCSS('Inherit') // 'Inherit'
 * toCSS([0, 1, '2vw']) // '0 1px 2vw' 
 */
export const toCSS = (n: CSSLongValue): string => {
  if (isArray(n)) {
    return n.map(toCSS).join(' ') // TODO: 这是不是过度设计了
  } else if (isNumber(n)) {
    return n === 0 ? '0' : `${n}px`
  } else if (isString(n)) {
    return /^\d+$/.test(n) ? `${n}px` : n
  } else {
    return ''
  }
}
export const fromPx = (rule: string): number => parseFloat(rule)

export const toVw = (...ns: MayDeepArray<number | string>[]) =>
  ns
    .flat(Infinity)
    .map((n) => changeUnit(n, 'vw'))
    .join(' ')

export const toVh = (...ns: MayDeepArray<number | string>[]) =>
  ns
    .flat(Infinity)
    .map((n) => changeUnit(n, 'vh'))
    .join(' ')

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
