import React, { ReactNode, useRef, useState } from 'react'
import { divProps, DivProps } from './Div'
import Icon, { IconProps } from './Icon'
import pick from 'utils/functions/object/pick'
import { setInlineStyle } from '../style/setCSS'
import { toPx } from '../style/cssUnits'
import { CSSObject } from '@emotion/react'
import cssColor from '../style/cssColor'
import { mixCSSObjects } from '../style/cssParser'
import cssMixins from '../style/cssMixins'
import { injectAppSetting } from './AppSettings'
import mergeProps from '../functions/mergeProps'
import { BaseUIDiv, Div } from '.'
import uiCSS from 'baseUI/settings/uiCSS'
import useCSS from 'baseUI/hooks/useCSS'

export interface InputProps extends DivProps {
  //TODO: 需要加入min-height之类，得有个最小高度
  /**
   * 输入框有多少行？
   * （一旦设定就是使用textArea）
   * auto - 能自动根据内容“增高”
   */
  row?: number | 'auto-increase'
  /**
   * 禁止输入
   */
  disabled?: boolean
  /**
   * placeholder
   */
  placeholder?: string
  prefixNode?: ReactNode

  props_Icon?: IconProps
  props_body?: DivProps<'input' | 'textarea'>
  /**
   * @cssProps 输入框宽度
   * @default '10px'
   */
  width?: Extract<CSSObject['width'], string>
}

/**
 * @BaseUIComponent
 */
function Input(props: InputProps) {
  const [value, setValue] = useState('')
  const inputBodyRef = useRef<HTMLInputElement | HTMLTextAreaElement>()

  const isTextarea = Boolean(props.row && props.row !== 1)

  // textarea模式下，需要同步高度以免出现滚动条
  const syncHeight = () => {
    const el = inputBodyRef.current
    if (el) {
      // 获取文字占有的height
      setInlineStyle(el, 'height', 0)
      setInlineStyle(el, 'height', toPx(el.scrollHeight))
    }
  }

  const css = useCSS(props, (props) => ({
    width: props.width,
    cursor: 'text',
    border: `1px solid ${cssColor.whitesmoke}`,
    ':focus-within': {
      borderColor: uiCSS.Input.focusColor
    },
    padding: '4px 8px',
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center'
  }))
  const IconCSS = useCSS(props, (props) => ({
    flex: 'none'
  }))
  const BodyCSS = useCSS(props, (props) => [
    {
      cursor: 'inherit',
      flex: '1 0 auto',
      background: 'transparent',
      caretColor: uiCSS.Input.caretColor,
      outline: 'none',
      border: 'none'
    },
    isTextarea &&
      mixCSSObjects(cssMixins.noScrollbar, {
        resize: 'none'
      })
  ])

  return (
    <BaseUIDiv {...pick(props, divProps)} _className='Input' css={css}>
      {props.prefixNode}
      {props.props_Icon && (
        <Icon
          {...mergeProps(props.props_Icon, {
            classNames: 'Input-Icon',
            css: IconCSS
          })}
        />
      )}
      <Div
        {...mergeProps(props.props_body, {
          as: isTextarea ? 'textarea' : 'input',
          className: 'Input-body',
          domRef: inputBodyRef,
          css: BodyCSS,
          htmlProps: {
            rows: typeof props.row === 'number' ? props.row : 1,
            placeholder: props.placeholder,
            disabled: props.disabled,
            value,
            onChange: (e) => {
              if (props.row === 'auto-increase') syncHeight()
              return setValue(e.target.value)
            }
          }
        })}
      />
    </BaseUIDiv>
  )
}
export default injectAppSetting(Input)
