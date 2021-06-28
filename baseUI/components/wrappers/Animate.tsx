import React from 'react'
import { omit } from 'utils/functions/object'
import { animateOptionKeys, UseAnimateOptions, useAnimateRef } from '../../hooks/useAnimate'
import { WrapperProps, DivProps } from '../baseProps'
import cloneElement from '../../functions/cloneElement'
import DomRef from './DomRef'

interface AnimateProps extends DivProps, WrapperProps, UseAnimateOptions {}

/**
 * @WrapperComponent a wrapper for web animation API
 */
export default function Animate({ children, ...restProps }: AnimateProps) {
  return cloneElement(children, (child) => (
    <DomRef {...omit(restProps, animateOptionKeys)} exRef={useAnimateRef(restProps)}>
      {child}
    </DomRef>
  ))
}
