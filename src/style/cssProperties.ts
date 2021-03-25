import { CSSProperties } from 'react'
import { CSSLongValue, toCSSString } from './cssUnits'
type CSSRule<T extends keyof CSSProperties> = { [a in T]: CSSProperties[T] }
export const paddingLeft = (val: number | string): CSSRule<'paddingLeft'> => ({
  paddingLeft: toCSSString(val)
})
export const paddingTop = (val: number | string): CSSRule<'paddingTop'> => ({
  paddingTop: toCSSString(val)
})
export const paddingRight = (val: number | string): CSSRule<'paddingRight'> => ({
  paddingRight: toCSSString(val)
})
export const paddingBottom = (val: number | string): CSSRule<'paddingBottom'> => ({
  paddingBottom: toCSSString(val)
})
export const padding = (
  val: CSSLongValue //这个类型原版里没有
): CSSRule<'padding'> => ({
  padding: toCSSString(val)
}) // 好处：有利于使代码更简洁
