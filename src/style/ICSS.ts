import { CSSObject } from '@emotion/react'
import { MayDeepArray } from 'typings/tools'
import isObject from 'utils/judgers/isObject'
export interface ICSSObject extends CSSObject {}
export type ICSS = MayDeepArray<ICSSObject | undefined>
export function ICSS(cssObject: string | number | ICSS, description?: string): ICSS {
  if (isObject(cssObject)) {
    return cssObject
  } else {
    throw new TypeError(description)
  }
}
