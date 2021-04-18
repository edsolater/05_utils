import React, { ReactNode, useState } from 'react'
import Div, { DivProps } from 'baseUI/Div'
import { mix } from 'style/cssParser'
import {
  useFeature as useFeatureStyle,
  featureProps as featureStyleProps,
  FeatureProps as FeatureStyleProps
} from './style.feature'
import omit from 'utils/object/omit'
import Img from 'baseUI/Img'
import Icon, { IconProps } from 'baseUI/Icon'

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
const featureCoreProps = ['row'] as const
const Input = (props: InputProps) => {
  const { style } = useFeatureStyle(props)
  const [value, setValue] = useState('')

  return (
    <Div
      {...omit(
        props,
        featureCoreProps,
        featureStyleProps
      )} /* TODO：好像只要Div可接收的props就够了 */
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
