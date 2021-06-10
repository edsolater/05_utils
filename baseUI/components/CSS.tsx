import { CSSObject } from '@emotion/react'
import React, { ReactNode } from 'react'
import omit from 'utils/functions/object/omit'

/**
 * @HollowComponent
 *
 * 这是个透明组件，作用是在其上设定的CSS属性，“下沉”到子节点的CSSProps
 */
const CSS = (props: CSSObject | { children?: ReactNode }): JSX.Element => {
  // @ts-expect-error
  return React.Children.map(props.children, (child) =>
    // @ts-expect-error
    React.cloneElement(child, { css: omit(props, ['children']) })
  )
}

export default CSS
