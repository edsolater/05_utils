import React, { ReactNode, RefObject } from 'react'
import DomRef from './DomRef'

/**
 * @WrapperComponent
 *
 * 这是个透明组件，作用是在其上设定的CSS属性，“下沉”到子节点的CSSProps
 */
const CSS = ({
  children,
  domRef,
  ...restProps
}: {
  domRef?: RefObject<any>
  children?: ReactNode
  [otherProps: string]: any // 这个模式并不好， 这是让 <CSS> 搞了特殊化
}) => {
  return (
    <DomRef css={restProps} domRef={domRef}>
      {children}
    </DomRef>
  )
}

export default CSS
