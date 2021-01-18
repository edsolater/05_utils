import isNumber from 'utils/judgers/isNumber'
import isString from 'utils/judgers/isString'

export type CSSValue = number | string
export const toVw = (n: number) => `${n}vw`
export const toVh = (n: number) => `${n}vh`
export const fullVw = '100vw'
export const fullVh = '100vh'

export const toPx = (n: number | string) => {
  if (isNumber(n)) {
    return n === 0 ? 0 : `${n}px`
  } else if (isString(n)) {
    return /^\d+$/.test(n) ? `${n}px` : n
  }
}
export const toPe = (n: number) => `${n}%`
export const halfPe = '50%'
export const fullPe = '100%'

export const fromPx = (rule: string): number => parseFloat(rule)
