import { MayDeepArray } from 'typings/tools'
import isArray from 'utils/judgers/isArray'
import isNumber from 'utils/judgers/isNumber'
import isString from 'utils/judgers/isString'
export type CSSLength = number | string
export type CSSValue = number | string
export type CSSLongValue = CSSValue | CSSValue[]
function changeUnit(val: number | string, unit: string) {
  if (typeof val === 'number') {
    if (val === 0) return '0'
    else return `${val}${unit}`
  } else {
    return `${Number.parseFloat(val)}${unit}`
  }
}
export const toCSSString = (n: CSSLongValue): string => {
  if (isArray(n)) {
    return n.map(toCSSString).join(' ')
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
