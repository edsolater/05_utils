import React from 'react'
import { injectAppSetting } from './AppSettings'
import { DivProps } from "./baseProps"
import { BaseUIDiv } from '.'
import uiCSS from 'baseUI/settings/uiCSS'
import { toICSS } from 'baseUI/style/cssParser'

export interface CaptionProps extends DivProps {
  /**
   * @cssProps
   * @default 'left
   */
  align?: 'left' | 'center' | 'right'
}

const getCSS = toICSS(({ align }: CaptionProps) => [
  {
    fontSize: '0.8em',
    color: uiCSS.Caption.textColor
  },
  align === 'left' && { textAlign: 'left' },
  align === 'center' && { textAlign: 'center' },
  align === 'right' && { textAlign: 'right' }
])

/**
 * @BaseUIComponent
 */
function Caption({ align, ...restProps }: CaptionProps) {
  const css = getCSS({ align })
  return <BaseUIDiv {...restProps} _css={css} />
}

export default injectAppSetting(Caption, { align: 'left' })
