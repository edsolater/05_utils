import { CSSObject } from '@emotion/react'
import { MayDeepArray } from 'typings/tools'
export type ICSS = MayDeepArray<CSSObject> 
export function ICSS(cssObject: any | string | number | object): ICSS {
  return cssObject
}