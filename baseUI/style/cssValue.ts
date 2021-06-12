import { CSSObject } from '@emotion/react'
import { CSSProperties } from 'react'

export const cssValues = {
  smoothShadow:
    '0px 4px 16px rgba(0, 0, 0, 0.1), 0px 8px 32px rgba(0, 0, 0, 0.05),0px 16px 64px rgba(0, 0, 0, 0.025)'
}
export type CSSPropertyValue<Name extends keyof CSSProperties> = Extract<CSSObject[Name], string>
