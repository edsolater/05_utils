import { createElement } from 'react'
import { useRef } from 'react'
import { parseICSS } from '../style/cssParser'
import classname from '../functions/classname'
import mergeRefs from '../functions/mergeRefs'
import useClick from '../hooks/useClick'
import { isString, isUndefined } from 'utils/functions/judgers'
import { omit } from 'utils/functions/object'
import { TagMap, DivProps } from './baseProps'

// TODO: as为组件时 的智能推断还不够好
export const Div = <TagName extends keyof TagMap = 'div'>(props: DivProps<TagName>) => {
  const divRef = useRef<TagMap[TagName]>(null)
  useClick<TagMap[TagName]>(divRef, { onClick: props.onClick })

  return isUndefined(props.as) || isString(props.as)
    ? createElement(props.as ?? 'div', {
        ...props.htmlProps,
        children: props.children,
        className: classname(props.className) + parseICSS(props.css),
        ref: mergeRefs(props.domRef, divRef),
        style: props.style
      })
    : // @ts-expect-error don't know why
      createElement(props.as, omit(props, 'as'))
}

export default Div
