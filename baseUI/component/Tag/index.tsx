import React from 'react'
import Div, { divProps, DivProps } from '../Div'
import { useTagStyle, TagStyleProps } from './style'
import pick from 'utils/functions/object/pick'
import Icon, { IconProps } from '../Icon'

// 应该就是一种 Card 的特殊呈现形式
export interface TagProps extends DivProps, TagStyleProps {
  /**
   * 一旦设置这项，就是有开关控件的
   */
  open?: boolean
  onClose?: () => void // TODO: 应该有提供取消关闭的控制对象的
  closeIconProp?: IconProps
}
/**
 * @BaseUIComponent
 */
export default function Tag(props: TagProps) {
  const { coreCss, tagCloseIconCss, tagCloseIconColor } = useTagStyle(props)
  return props.open === undefined || props.open === true ? (
    <Div
      {...pick(props, divProps)}
      className={[props.className, '__tag-box']}
      css={[props.css, coreCss]}
    >
      {props.children}
      {props.open !== undefined && ( //TODO：这个if逻辑导致每次都要重新加载整个卡片内容，就第一次是整体加载，然后都是显示/隐藏 //IDEA: 把这个显示的逻辑单独提取成一个组件
        <Icon
          color={tagCloseIconColor} // 因为这里的color需要用来开启自定义颜色的功能，故不能转而使用cssVariable
          clickable
          onClick={() => props.onClose?.()}
          {...props.closeIconProp}
          className={[props.closeIconProp?.className, '__tag-close-icon']}
          css={[props.closeIconProp?.css, tagCloseIconCss]}
          name='close'
        />
      )}
    </Div>
  ) : null
}
