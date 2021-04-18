import React, { ReactNode, useState } from 'react'
import Div, { divProps, DivProps } from 'baseUI/Div'
import { mix } from 'style/cssParser'
import {
  useFeature as useFeatureStyle,
  FeatureProps as FeatureStyleProps
} from './style.feature'
import Icon, { IconProps } from 'baseUI/Icon'
import pick from 'utils/object/pick'

export interface InputProps extends DivProps, FeatureStyleProps {
  /**
   * 输入框有多少行？
   * （一旦设定就是使用textArea）
   * auto - 能自动根据内容“增高”
   */
  row?: number | 'auto'
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
  const { style } = useFeatureStyle(props)
  const [value, setValue] = useState('')

  return (
    <Div
      {...pick(props, divProps)}
      className={['__input-box', props.className]}
      css={mix(style, props.css)}
    >
      {props.prefixNode}
      {props.iconProps && <Icon {...props.iconProps} />}
      <Div
        _tagName='input'
        className='__input-body'
        htmlProps={{
          placeholder: props.placeholder,
          disabled: props.disabled,
          value,
          onChange: (e) => setValue(e.target.value)
        }}
      />
    </Div>
  )
}

export default Input

// IDEA: 要做Dropdown的话，需用 Card + Scroll
