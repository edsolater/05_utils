import React, { ReactNode } from 'react'

/**
 * @HollowComponent
 *
 * 这是个透明组件，作用是在其上设定的CSS属性，“下沉”到子节点的CSSProps
 */
const CSS = (props: {
  domRef?: any
  children?: ReactNode
  [otherProps: string]: any
}): JSX.Element => {
  const { children, domRef, ...restProps } = props
  // @ts-expect-error
  return React.Children.map(children, (child) =>
    // @ts-expect-error
    React.cloneElement(child, { domRef, css: restProps })
  )
}

export default CSS
