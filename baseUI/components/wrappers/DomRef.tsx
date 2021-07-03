import { mergeProps } from 'baseUI/functions'
import React from 'react'
import { DivProps, WrapperProps } from '../baseProps'
import cloneElements from '../../functions/cloneElements'
import { parseIRefsWrapper } from 'baseUI/functions/parseRefs'
import { IRefs } from 'baseUI/functions/mergeRefs'
import useCallbackRef from 'baseUI/hooks/useCallbackRef'

interface DomRefProps extends DivProps, WrapperProps {
  /** 为了避免与domRef产生覆盖行为，所以以ex为开头 */
  exDomRef?: IRefs<HTMLElement>
}

export default function DomRef({ exDomRef, children, domRef, ...restProps }: DomRefProps) {
  const allRefs = [domRef, exDomRef].flat()

  if (!allRefs.length) return <>{children}</>

  return cloneElements(children, (child, idx) => {
    return React.cloneElement(
      child,
      mergeProps(restProps, {
        domRef: useCallbackRef((dom) => parseIRefsWrapper(allRefs, (ref) => ((ref.current ??= [])[idx] = dom)))
      })
    )
  })
}
