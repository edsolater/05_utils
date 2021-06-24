import React from 'react'
import { injectAppSetting } from './AppSettings'
import { DivProps, divProps } from './Div'
import { pick } from 'utils/functions/object'
import BaseUIDiv from './BaseUIDiv'
import cssColor from 'baseUI/style/cssColor'
import { cssBrightness } from 'baseUI/style/cssFunctions'
import useCSS from 'baseUI/hooks/useCSS'
import uiCSS from 'baseUI/settings/uiCSS'

export interface ButtonProps extends DivProps<'button'> {
  /**
   * @cssProps
   * @default 'fill'
   */
  type?: 'fill' | 'outline' | 'text'
  /**
   * @cssProps
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large'
}

/**
 * @UIComponent Button
 */
const Button = (props: ButtonProps) => {
  const css = useCSS(props, (props) => [
    {
      style: 'none',
      borderWidth: 0,
      cursor: 'pointer',
      userSelect: 'none',
      width: 'max-content',
      boxSizing: 'border-box'
    },
    props.size === 'small' && {
      padding: uiCSS.Button['padding--small'],
      fontSize: uiCSS.Button['fontSize--small'],
      borderRadius: uiCSS.Button['borderRadius--small']
    },
    props.size === 'medium' && {
      padding: uiCSS.Button['padding--medium'],
      fontSize: uiCSS.Button['fontSize--medium'],
      borderRadius: uiCSS.Button['borderRadius--medium']
    },
    props.size === 'large' && {
      padding: uiCSS.Button['padding--large'],
      fontSize: uiCSS.Button['fontSize--large'],
      borderRadius: uiCSS.Button['borderRadius--large']
    },
    props.type === 'fill' && {
      color: uiCSS.Button['textColor--fill'],
      position: 'relative',
      background: 'none',
      '::before': {
        content: "''",
        position: 'absolute',
        inset: '0',
        borderRadius: 'inherit',
        zIndex: '-1',
        background: uiCSS.Button['background--fill']
      },
      ':hover::before': { filter: cssBrightness(1.4) },
      ':active::before': { filter: cssBrightness(0.8) }
    },
    props.type === 'outline' && {
      position: 'relative',
      background: cssColor.transparent,
      color: uiCSS.Button['textColor--outline'],
      '::before': {
        content: "''",
        position: 'absolute',
        inset: '0',
        borderRadius: 'inherit',
        borderWidth: uiCSS.Button['borderWidth--outline'] ?? '1px',
        borderStyle: 'solid',
        borderColor: uiCSS.Button['borderColor--outline'] ?? 'currentcolor',
        opacity: uiCSS.Button['borderOpacity--outline'] ?? '0.3',
        color: 'inherit'
      }
    },
    props.type === 'text' && {
      color: uiCSS.Button['textColor--text'],
      background: 'transparent'
    }
  ])

  return (
    <BaseUIDiv {...pick(props, divProps)} as='button' _css={css}>
      {props.children ?? '🤨'}
    </BaseUIDiv>
  )
}

export default injectAppSetting(Button, { type: 'fill', size: 'medium' })

