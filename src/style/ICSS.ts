import { CSSObject } from '@emotion/react'
import { MayDeepArray } from 'typings/tools'
import isObject from 'utils/judgers/isObject'
export type ICSS = MayDeepArray<CSSObject>
export function ICSS(cssObject: string | number | ICSS, description?: string): ICSS {
  if (isObject(cssObject)){
    return cssObject
  } else {
    throw new TypeError(description)
  }
}
