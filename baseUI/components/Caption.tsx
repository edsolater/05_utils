import React from 'react'
import { pick } from 'utils/functions/object'
import { injectAppSetting } from './AppSettings'
import { DivProps, divProps } from './Div'
import { BaseUIDiv } from '.'
import useCSS from 'baseUI/hooks/useCSS'
import uiCSS from 'baseUI/settings/uiCSS'

export interface CaptionProps extends DivProps {
  /**
   * @cssProps
   * @default 'left
   */
  align?: 'left' | 'center' | 'right'
}

/**
 * @BaseUIComponent
 */
function Caption(props: CaptionProps) {
  const css = useCSS(props, (props) => [
    {
      fontSize: '0.8em',
      color: uiCSS.Caption.textColor
    },
    props.align === 'left' && { textAlign: 'left' },
    props.align === 'center' && { textAlign: 'center' },
    props.align === 'right' && { textAlign: 'right' }
  ])

  return <BaseUIDiv {...pick(props, divProps)} _css={css} />
}

export default injectAppSetting(Caption, { align: 'left' })
