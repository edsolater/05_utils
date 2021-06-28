import React, { ReactNode, RefObject } from 'react'
import _DomRef from './_DomRef'

/**
 * @HollowComponent
 *
 * 这是个透明组件，作用是在其上设定的CSS属性，“下沉”到子节点的CSSProps
 */
const _CSS = ({
  children,
  domRef,
  ...restProps
}: {
  domRef?: RefObject<any>
  children?: ReactNode
  [otherProps: string]: any // 这个模式并不好， 这是让 <_CSS> 搞了特殊化
}) => {
  return (
    <_DomRef css={restProps} domRef={domRef}>
      {children}
    </_DomRef>
  )
}

export default _CSS
