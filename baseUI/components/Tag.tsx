import React, { ReactNode } from 'react'
import { BaseUIDiv, Icon } from '.'
import { injectAppSetting } from './AppSettings'
import { DivProps } from './Div'
import { IconProps } from './Icon'
import cssColor from 'baseUI/style/cssColor'
import cssTheme from 'baseUI/settings/cssTheme'
import { toICSS } from 'baseUI/style/cssParser'
import Clickable from './wrappers/Clickable'

// 应该就是一种 Card 的特殊呈现形式
export interface TagProps extends DivProps {
  controls?: boolean
  onClose?: () => void // TODO: 应该有提供取消关闭的控制对象的
  propscloseIcon?: IconProps
  children?: ReactNode
}

const getCSS = toICSS(() => ({
  height: '24px', // 与“关闭”图标 同高
  paddingLeft: '8px',
  paddingRight: '8px',
  display: 'inline-flex',
  alignItems: 'center',
  background: cssColor.lightgrey,
  borderRadius: '4px'
}))

/**
 * @BaseUIComponent
 */
function Tag({ children, controls, propscloseIcon, onClose, ...restProps }: TagProps) {
  const css = getCSS()
  return (
    <BaseUIDiv {...restProps} _className='Tag' _css={css}>
      {children}
      {controls && (
        <Clickable
          onClick={() => {
            onClose?.()
          }}
        >
          <Icon
            {...propscloseIcon}
            color={propscloseIcon?.color ?? cssTheme.color.darkText} // 因为这里的color需要用来开启自定义颜色的功能，故不能转而使用cssVariable
            className={['Tag-Icon', propscloseIcon?.className]}
            css={propscloseIcon?.css}
            name='close'
          />
        </Clickable>
      )}
    </BaseUIDiv>
  )
}
export default injectAppSetting(Tag)
