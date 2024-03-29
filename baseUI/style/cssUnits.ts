import { MayDeepArray } from 'typings/tools'
import isNullish from '@edsolater/fnkit/dist/judgers/isNullish'
import isNumber from '@edsolater/fnkit/dist/judgers/isNumber'
import isUndefined from '@edsolater/fnkit/dist/judgers/isUndefined'
export type CSSLength = string
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
 * changeUnit(400, 'px') // '400px'
 * changeUnit('400px', 'px') // '400px'
 * changeUnit('40px', 'vw') // '40vw'
 */
function changeUnit(val: number | string, unit: string) {
  if (val === undefined) return undefined
  if (typeof val === 'number') {
    if (val === 0) return '0'
    else return `${val}${unit}`
  } else {
    return `${Number.parseFloat(val)}${unit}`
  }
}

export const fromPx = (rule: string): number => parseFloat(rule)

export const toPx = (v: MayDeepArray<number | string>) =>
  [v]
    .flat(Infinity)
    .map((n) => changeUnit(n, 'px'))
    .join(' ')

export function toPxIfNumber(v: number | string | undefined | null): string {
  return isNullish(v) ? '' : isNumber(v) ? toPx(v) : v
}
/**
 * 与 {@link toPx} 的区别在于：如果已有单位，则不做更改
 */
export const toCssValue = (v: MayDeepArray<number | string | undefined>) =>
  [v]
    .flat(Infinity)
    .map((n) => (isNumber(n) ? toPx(n) : isUndefined(n) ? '' : n))
    .join(' ')

export const toPer = (v: MayDeepArray<number | string>) =>
  [v]
    .flat(Infinity)
    .map((n) => changeUnit(n, '%'))
    .join(' ')

export type CSSValueLength = number | `${number}${'' | 'px' | 'vw' | 'em' | 'rem' | '%'}` | 'auto' // TODO: consider max() min() clamp() var() calc()
