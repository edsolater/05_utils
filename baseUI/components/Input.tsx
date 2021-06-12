import React, { ReactNode, useRef, useState } from 'react'
import Div, { BaseUIDiv, divProps, DivProps } from './Div'
import Icon, { IconProps } from './Icon'
import pick from 'utils/functions/object/pick'
import { setInlineStyle } from '../style/setCSS'
import { toPx } from '../style/cssUnits'
import { CSSObject } from '@emotion/react'
import cssColor from 'baseUI/style/cssColor'
import { cssVar } from 'baseUI/style/cssFunctions'
import { mixCSSObjects } from 'baseUI/style/cssParser'
import cache from 'utils/functions/functionFactory/cache'
import { mergeDeepObject } from 'utils/functions/merge'
import { cssMixins } from 'baseUI/style/cssMixins'

export interface InputProps extends DivProps, InputCSSProps {
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
}

interface InputCSSProps {
  /**
   * CSS: 输入框宽度
   * @default '10px'
   *
   * 对应于css variable : --input-box-width
   */
  width?: Extract<CSSObject['width'], string>

  /**
   * CSS: 输入框颜色
   */
  focusColor?: Extract<CSSObject['color'], string>
  /**
   * CSS: 光标颜色
   *
   */
  caretColor?: Extract<CSSObject['color'], string>
}

const getCSS = cache((props: InputCSSProps) =>
  mixCSSObjects({
    width: props.width,
    cursor: 'text',
    border: `1px solid ${cssColor.whitesmoke}`,
    ':focus-within': {
      borderColor: props.focusColor
    },
    padding: '4px 8px',
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center'
  })
)
const getIconCSS = cache((props: InputCSSProps) =>
  mixCSSObjects({
    flex: 'none'
  })
)
const getBodyCSS = cache((props: InputCSSProps, detail: { isTextarea: boolean }) =>
  mixCSSObjects(
    {
      cursor: 'inherit',
      flex: '1 0 auto',
      background: cssColor.transparent,
      caretColor: cssVar('--input-caret-color', props.caretColor ?? 'unset'),
      outline: 'none',
      border: 'none'
    },
    detail.isTextarea &&
      mixCSSObjects(cssMixins.noScrollbar, {
        resize: 'none'
      })
  )
)

/**
 * @BaseUIComponent
 */
const Input = (props: InputProps) => {
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

  return (
    <BaseUIDiv {...pick(props, divProps)} _className='Input' css={getCSS(props)}>
      {props.prefixNode}
      {props.props_Icon && (
        <Icon
          {...mergeDeepObject([
            // TODO: 应该有个 mergeWithOptions() 与 mergeProps() 。 浅复制不需要特意封装方法。这样 <BaseUIDiv> 就失去了意义
            props.props_Icon,
            {
              classNames: 'Input-Icon',
              css: getIconCSS(props)
            }
          ])}
        />
      )}
      <Div
        {...mergeDeepObject([
          props.props_body,
          {
            as: isTextarea ? 'textarea' : 'input',
            className: 'Input-body',
            domRef: inputBodyRef,
            css: getBodyCSS(props, { isTextarea }),
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
          }
        ])}
      />
    </BaseUIDiv>
  )
}

export default Input
