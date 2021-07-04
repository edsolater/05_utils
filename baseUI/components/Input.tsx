import React, { ReactNode, useRef, useState } from 'react'
import { DivProps } from "./baseProps"
import Icon, { IconProps } from './Icon'
import { setInlineStyle } from '../style/setCSS'
import { toPx } from '../style/cssUnits'
import { CSSObject } from '@emotion/react'
import cssColor from '../style/cssColor'
import { mixCSSObjects, toICSS } from '../style/cssParser'
import cssMixins from '../style/cssMixins'
import { InjectAppSetting } from './AppSettings'
import mergeProps from '../functions/mergeProps'
import { BaseUIDiv, Div } from '.'
import uiCSS from 'baseUI/settings/uiCSS'

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

  propsIcon?: IconProps
  propsbody?: DivProps<'input' | 'textarea'>
  /**
   * @cssProps 输入框宽度
   * @default '10px'
   */
  width?: Extract<CSSObject['width'], string>
}

const getCSS = toICSS(({ width }: InputProps) => ({
  width: width,
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

const getIconCSS = toICSS(() => ({
  flex: 'none'
}))

const getBodyCSS = toICSS((isTextarea: boolean) => [
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

/**
 * @BaseUIComponent
 */
function Input({
  row,
  disabled,
  placeholder,
  prefixNode,
  propsIcon,
  propsbody,
  width,
  ...restProps
}: InputProps) {
  const [value, setValue] = useState('')
  const inputBodyRef = useRef<HTMLInputElement | HTMLTextAreaElement>()

  const isTextarea = Boolean(row && row !== 1)

  // textarea模式下，需要同步高度以免出现滚动条
  const syncHeight = () => {
    const el = inputBodyRef.current
    if (el) {
      // 获取文字占有的height
      setInlineStyle(el, 'height', 0)
      setInlineStyle(el, 'height', toPx(el.scrollHeight))
    }
  }

  const css = getCSS({ width })
  const IconCSS = getIconCSS()
  const BodyCSS = getBodyCSS(isTextarea)

  return (
    <BaseUIDiv {...restProps} _className='Input' css={css}>
      {prefixNode}
      {propsIcon && (
        <Icon
          {...mergeProps(propsIcon, {
            classNames: 'Input-Icon',
            css: IconCSS
          })}
        />
      )}
      <Div
        as={isTextarea ? 'textarea' : 'input'}
        {...mergeProps(propsbody, {
          className: 'Input-body',
          domRef: inputBodyRef,
          css: BodyCSS,
          htmlProps: {
            rows: typeof row === 'number' ? row : 1,
            placeholder: placeholder,
            disabled: disabled,
            value,
            onChange: (e) => {
              if (row === 'auto-increase') syncHeight()
              return setValue(e.target.value)
            }
          }
        })}
      />
    </BaseUIDiv>
  )
}
export default InjectAppSetting(Input)
