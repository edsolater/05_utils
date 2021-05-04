import React, { ReactNode, useEffect, useRef, useState } from 'react'
import Div, { divProps, DivProps } from 'baseUI/Div'
import { mixCSSObjects } from 'style/cssParser'
import { useInputStyle, InputStyleProps } from './style'
import Icon, { IconProps } from 'baseUI/Icon'
import pick from 'utils/object/pick'
import { setInlineStyle } from 'style/setCSS'
import { toPx } from 'style/cssUnits'

export interface InputProps extends DivProps, InputStyleProps {
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
  iconProps?: IconProps
}
const Input = (props: InputProps) => {
  const [value, setValue] = useState('')
  const inputBodyRef = useRef<HTMLInputElement | HTMLTextAreaElement>()

  const isTextarea = Boolean(props.row && props.row !== 1)

  // textarea模式下，需要同步高度以免出现滚动条
  const syncHeight = () => {
    const el = inputBodyRef.current
    if (el) {
      // 获取文字占有的height
      // （这会造成计算出两幅画面，但因为在同一帧，所以界面只会重刷一次（TODO待验证））
      setInlineStyle(el, 'height', 0)
      setInlineStyle(el, 'height', toPx(el.scrollHeight))
    }
  }

  const { coreCss, inputBodyCss, inputIconCss } = useInputStyle(props, { isTextarea })
  return (
    <Div {...pick(props, divProps)} className={['__input-box', props.className]} css={coreCss}>
      {props.prefixNode}
      {props.iconProps && <Icon className='__input-icon' {...props.iconProps} css={inputIconCss} />}
      <Div
        domRef={inputBodyRef}
        _tagName={isTextarea ? 'textarea' : 'input'}
        css={inputBodyCss}
        className='__input-body'
        htmlProps={{
          rows: typeof props.row === 'number' ? props.row : 1,
          placeholder: props.placeholder,
          disabled: props.disabled,
          value,
          onChange: (e) => {
            if (props.row === 'auto-increase') syncHeight()
            return setValue(e.target.value)
          }
        }}
      />
    </Div>
  )
}

export default Input

