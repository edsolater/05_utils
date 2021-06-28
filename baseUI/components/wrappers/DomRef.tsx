import { mergeProps } from 'baseUI/functions'
import { IRefs } from 'baseUI/functions/mergeRefs'
import React from 'react'
import { DivProps } from "../baseProps"
import useCallbackRef from '../../hooks/useCallbackRef'
import cloneElement from '../../functions/cloneElement'
import { parseIRefsWrapper } from 'baseUI/functions/parseRefs'

interface DomRefProps extends DivProps {
  exRef?: IRefs<HTMLElement>
}

export default function DomRef({ exRef, children, domRef, ...restProps }: DomRefProps) {
  const allRefs = [domRef, exRef].flat()

  if (!allRefs.length) return <>{children}</>

  parseIRefsWrapper(allRefs, (ref) => {
    Reflect.set(ref ?? {}, 'current', [])
  })

  return cloneElement(children, (child, idx) =>
    React.cloneElement(
      child,
      mergeProps(restProps, {
        domRef: useCallbackRef((dom) =>
          parseIRefsWrapper(allRefs, (ref) => (ref.current as any[])?.splice(idx, 1, dom))
        )
      })
    )
  )
}
