import { mergeProps } from 'baseUI/functions'
import { IRefs } from 'baseUI/functions/mergeRefs'
import React from 'react'
import { DivProps } from './Div'
import _Props from './_Props'
import useCallbackRef from '../hooks/useCallbackRef'
import cloneElement from './mapReactChildren'
import { parseIRefsWrapper } from 'baseUI/functions/parseRefs'

interface _DomRefProps extends DivProps {
  exRef?: IRefs<HTMLElement>
}

export default function _DomRef({ exRef, children, domRef, ...restProps }: _DomRefProps) {
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
