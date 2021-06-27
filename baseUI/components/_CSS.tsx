import React, { ReactNode, RefObject } from 'react'
import useCallbackRef from '../hooks/useCallbackRef'

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
  [otherProps: string]: any
}): JSX.Element => {
  Reflect.set(domRef ?? {}, 'current', [])

  // @ts-expect-error
  return React.Children.map(children, (child, idx) =>
    // @ts-expect-error
    React.cloneElement(child, {
      domRef: useCallbackRef((dom) => (domRef?.current as any[])?.splice(idx, 1, dom)),
      css: restProps
    })
  )
}

export default _CSS
