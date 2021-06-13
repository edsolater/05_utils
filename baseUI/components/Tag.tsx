import React from 'react'
import { mergeProps, addDefaultProps } from 'baseUI/functions'
import { cssDefaults } from 'baseUI/settings'
import { mixCSSObjects, cssColor } from 'baseUI/style'
import { cache } from 'utils/functions/functionFactory'
import { pick } from 'utils/functions/object'
import { BaseUIDiv, Icon } from '.'
import { useAppSettings } from './AppSettings'
import { DivProps, divProps } from './Div'
import { IconProps } from './Icon'

// 应该就是一种 Card 的特殊呈现形式
export interface TagProps extends DivProps {
  controls?: boolean
  onClose?: () => void // TODO: 应该有提供取消关闭的控制对象的
  closeIconProp?: IconProps
}
export interface TagSprops extends TagProps {}

const defaultSprops: TagSprops = {}

const getCSS = cache((props: TagSprops) =>
  mixCSSObjects({
    height: '24px', // 与“关闭”图标 同高
    paddingLeft: '8px',
    paddingRight: '8px',
    display: 'inline-flex',
    alignItems: 'center',
    background: cssColor.lightgrey,
    borderRadius: '4px'
  })
)
/**
 * @BaseUIComponent
 */
export default function Tag(props: TagProps) {
  const appSettings = useAppSettings()
  const _sprops = mergeProps(appSettings.globalProps?.Caption, props)
  const sprops = addDefaultProps(_sprops, defaultSprops)

  return (
    <BaseUIDiv {...pick(sprops, divProps)} _className='Tag' _css={getCSS(sprops)}>
      {sprops.children}
      {sprops.controls && (
        <Icon
          {...sprops.closeIconProp}
          color={sprops.closeIconProp?.color ?? cssDefaults.darkText} // 因为这里的color需要用来开启自定义颜色的功能，故不能转而使用cssVariable
          onClick={(...params) => {
            sprops.onClose?.()
            sprops.closeIconProp?.onClick?.(...params)
          }}
          className={['Tag-Icon', sprops.closeIconProp?.className]}
          css={sprops.closeIconProp?.css}
          name='close'
        />
      )}
    </BaseUIDiv>
  )
}
