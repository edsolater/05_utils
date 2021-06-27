import { mergeProps } from 'baseUI/functions'
import { IRefs } from 'baseUI/functions/mergeRefs'
import React from 'react'
import { DivProps } from './Div'
import _Props from './_Props'
import useCallbackRef from '../hooks/useCallbackRef'
import mapReactChildren from './mapReactChildren'
import { parseIRefsWrapper } from 'baseUI/functions/parseRefs'

interface _DomRefProps extends DivProps {
  exRef?: IRefs<HTMLElement>
}

export default function _DomRef({ exRef, children, domRef, ...restProps }: _DomRefProps) {
  parseIRefsWrapper(exRef, (r) => {
    Reflect.set(r ?? {}, 'current', [])
  })
  return mapReactChildren(children, (child, idx) => (
    <_Props
      {...mergeProps(
        restProps, // TODO 其实这里应该要深拷贝的
        { domRef },
        {
          domRef: useCallbackRef((dom) =>
            parseIRefsWrapper(exRef, (ref) => (ref.current as any[])?.splice(idx, 1, dom))
          )
        }
      )}
    >
      {child}
    </_Props>
  ))
}
