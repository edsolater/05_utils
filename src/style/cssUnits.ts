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
export const toVw = (n: number | string) => changeUnit(n, 'vw')
export const toVh = (n: number) => changeUnit(n, 'vh')
export const toPx = (n: number | string) => changeUnit(n, 'px')
export const toPer = (n: number) => changeUnit(n, '%')
export const fullVw = '100vw'
export const fullVh = '100vh'
export const halfPer = '50%'
export const fullPer = '100%'
