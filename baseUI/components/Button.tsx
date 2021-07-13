import React from 'react'
import { injectAppSetting } from './AppSettings'
import { DivProps } from './Div'
import BaseUIDiv from './BaseUIDiv'
import cssColor from 'baseUI/style/cssColor'
import { toICSS } from 'baseUI/style/cssParser'
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

const cssFn = toICSS(({ type, size }: ButtonProps) => [
  {
    style: 'none',
    borderWidth: 0,
    cursor: 'pointer',
    userSelect: 'none',
    width: 'max-content',
    boxSizing: 'border-box'
  },
  size === 'small' && {
    padding: uiCSS.Button['padding--small'],
    fontSize: uiCSS.Button['fontSize--small'],
    borderRadius: uiCSS.Button['borderRadius--small']
  },
  size === 'medium' && {
    padding: uiCSS.Button['padding--medium'],
    fontSize: uiCSS.Button['fontSize--medium'],
    borderRadius: uiCSS.Button['borderRadius--medium']
  },
  size === 'large' && {
    padding: uiCSS.Button['padding--large'],
    fontSize: uiCSS.Button['fontSize--large'],
    borderRadius: uiCSS.Button['borderRadius--large']
  },
  type === 'fill' && {
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
    ':hover::before': { filter: `brightness(1.4)` },
    ':active::before': { filter: `brightness(0.8)` }
  },
  type === 'outline' && {
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
  type === 'text' && {
    color: uiCSS.Button['textColor--text'],
    background: 'transparent'
  }
])
/**
 * @UIComponent Button
 */
const Button = ({ size, type, children, ...restProps }: ButtonProps) => {
  const css = cssFn({ size, type })
  return (
    <BaseUIDiv {...restProps} as='button' _css={css}>
      {children ?? '🤨'}
    </BaseUIDiv>
  )
}

export default injectAppSetting(Button, { type: 'fill', size: 'medium' })
