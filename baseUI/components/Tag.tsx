import React from 'react'
import { BaseUIDiv, divProps, DivProps } from './Div'
import pick from 'utils/functions/object/pick'
import Icon, { IconProps } from './Icon'
import cache from 'utils/functions/functionFactory/cache'
import { mixCSSObjects } from 'baseUI/style/cssParser'
import cssColor from 'baseUI/style/cssColor'
import cssDefaults from 'baseUI/settings/cssDefaults'

// 应该就是一种 Card 的特殊呈现形式
export interface TagProps extends DivProps, TagCSSProps {
  controls?: boolean
  onClose?: () => void // TODO: 应该有提供取消关闭的控制对象的
  closeIconProp?: IconProps
}
interface TagCSSProps {
  closeIconColor?: IconProps['color']
}

const getCSS = cache((props: TagCSSProps) =>
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
  return (
    <BaseUIDiv {...pick(props, divProps)} _className='Tag' _css={getCSS(props)}>
      {props.children}
      {props.controls && (
        <Icon
          {...props.closeIconProp}
          color={props.closeIconProp?.color ?? cssDefaults.darkText} // 因为这里的color需要用来开启自定义颜色的功能，故不能转而使用cssVariable
          onClick={(...params) => {
            props.onClose?.()
            props.closeIconProp?.onClick?.(...params)
          }}
          className={['Tag-Icon', props.closeIconProp?.className]}
          css={props.closeIconProp?.css}
          name='close'
        />
      )}
    </BaseUIDiv>
  )
}
