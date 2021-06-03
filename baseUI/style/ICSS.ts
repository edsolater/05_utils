import { CSSObject} from '@emotion/react'
import { MayDeepArray } from 'typings/tools'
import isObjectLike from 'utils/functions/judgers/isObjectLike'
export interface ICSSObject extends CSSObject {}
export type ICSS = MayDeepArray<ICSSObject | undefined>
export function ICSS(cssObject: string | number | ICSS, description?: string): ICSS {
  if (isObjectLike(cssObject)) {
    return cssObject
  } else {
    throw new TypeError(description)
  }
}
