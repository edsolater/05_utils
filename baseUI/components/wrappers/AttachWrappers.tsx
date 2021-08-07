import { mergeProps } from 'baseUI/functions'
import React, { isValidElement } from 'react'
import { ReactNode } from 'react'
import { isEmptyObject } from '@edsolater/fnkit/dist/judgers'
import notEmptyObject from '@edsolater/fnkit/dist/judgers/notEmptyObject'
import { splitObject } from '@edsolater/fnkit/dist/object'
import AttachButtonLike, { AttachButtonLikeProps } from './AttachButtonLike'
import AttachClickable, { AttachClickableProps } from './AttachClickable'
import AttachCustomizedClassName, {
  AttachCustomizedClassNameProps
} from './AttachCustomizedClassName'
import AttachForestedGlass, { AttachForestedGlassProps } from './AttachForestedGlass'
import AttachHoverable, { AttachHoverableProps } from './AttachHoverable'

export interface AttachWrapperProps {
  Hoverable?: AttachHoverableProps | true
  Clickable?: AttachClickableProps | true
  ForestedGlass?: AttachForestedGlassProps | true
  CustomizedClassName?: AttachCustomizedClassNameProps | true
  ButtonLike?: AttachButtonLikeProps | true
}
const AttachWrapperComponents = {
  Hoverable: AttachHoverable,
  Clickable: AttachClickable,
  ForestedGlass: AttachForestedGlass,
  CustomizedClassName: AttachCustomizedClassName,
  ButtonLike: AttachButtonLike
}
export default function AttachWrappers({
  children,
  ...restProps
}: AttachWrapperProps & { children?: ReactNode }) {
  if (isEmptyObject(restProps)) return children as JSX.Element
  // Suppose: all PascalCase props is innerProps
  const [innerProps, outerProps] = splitObject(restProps, (key) => /^[A-Z].*/.test(key))
  return Object.entries(innerProps).reduceRight(
    (acc, [wrapperName, wrapperProps]) => {
      const Component = AttachWrapperComponents[wrapperName as keyof typeof AttachWrapperComponents]
      const props = wrapperProps === true ? {} : wrapperProps
      return React.createElement(Component, props, acc)
    },
    isValidElement(children) && notEmptyObject(outerProps)
      ? React.cloneElement(children, mergeProps(children.props, outerProps))
      : children
  ) as JSX.Element
}
