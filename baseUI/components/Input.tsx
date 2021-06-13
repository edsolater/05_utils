import React, { ReactNode, useRef, useState } from 'react'
import Div, { BaseUIDiv, divProps, DivProps } from './Div'
import Icon, { IconProps } from './Icon'
import pick from 'utils/functions/object/pick'
import { setInlineStyle } from '../style/setCSS'
import { toPx } from '../style/cssUnits'
import { CSSObject } from '@emotion/react'
import cssColor from 'baseUI/style/cssColor'
import { mixCSSObjects } from 'baseUI/style/cssParser'
import cache from 'utils/functions/functionFactory/cache'
import { cssMixins } from 'baseUI/style/cssMixins'
import { useAppSettings } from './AppSettings'
import mergeProps from 'baseUI/functions/mergeProps'
import addDefaultProps from 'baseUI/functions/addDefaultProps'

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

  /**
   * @cssProps 输入框颜色
   */
  focusColor?: Extract<CSSObject['color'], string>
  /**
   * @cssProps 光标颜色
   */
  caretColor?: Extract<CSSObject['color'], string>
}

export interface InputSprops extends InputProps {
  borderColor?: Extract<CSSObject['color'], string>
}

const defaultSprops: InputSprops = {
  borderColor: cssColor.whitesmoke
}

const getCSS = cache((sprops: InputSprops) =>
  mixCSSObjects({
    width: sprops.width,
    cursor: 'text',
    border: `1px solid ${cssColor.whitesmoke}`,
    ':focus-within': {
      borderColor: sprops.focusColor
    },
    padding: '4px 8px',
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center'
  })
)
const getIconCSS = cache((sprops: InputSprops) =>
  mixCSSObjects({
    flex: 'none'
  })
)
const getBodyCSS = cache((sprops: InputSprops, detail: { isTextarea: boolean }) =>
  mixCSSObjects(
    {
      cursor: 'inherit',
      flex: '1 0 auto',
      background: 'transparent',
      caretColor: sprops.caretColor ?? 'unset',
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
export default function Input(props: InputProps) {
  const appSettings = useAppSettings()
  const _sprops = mergeProps(appSettings.globalProps?.Input, props)
  const sprops = addDefaultProps(_sprops, defaultSprops)

  const [value, setValue] = useState('')
  const inputBodyRef = useRef<HTMLInputElement | HTMLTextAreaElement>()

  const isTextarea = Boolean(sprops.row && sprops.row !== 1)

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
    <BaseUIDiv {...pick(sprops, divProps)} _className='Input' css={getCSS(sprops)}>
      {sprops.prefixNode}
      {sprops.props_Icon && (
        <Icon
          {...mergeProps(sprops.props_Icon, {
            classNames: 'Input-Icon',
            css: getIconCSS(sprops)
          })}
        />
      )}
      <Div
        {...mergeProps(sprops.props_body, {
          as: isTextarea ? 'textarea' : 'input',
          className: 'Input-body',
          domRef: inputBodyRef,
          css: getBodyCSS(sprops, { isTextarea }),
          htmlProps: {
            rows: typeof sprops.row === 'number' ? sprops.row : 1,
            placeholder: sprops.placeholder,
            disabled: sprops.disabled,
            value,
            onChange: (e) => {
              if (sprops.row === 'auto-increase') syncHeight()
              return setValue(e.target.value)
            }
          }
        })}
      />
    </BaseUIDiv>
  )
}
