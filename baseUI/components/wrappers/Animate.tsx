import React, { useEffect } from 'react'
import { omit } from 'utils/functions/object'
import { animateOptionKeys, UseAnimateOptions, useAnimateRef } from '../../hooks/useAnimate'
import { WrapperProps, DivProps } from '../baseProps'
import DomRef from './DomRef'
import { isString, isTrue } from 'utils/functions/judgers'
import parseIRefs, { parseIRefsWrapper } from 'baseUI/functions/parseRefs'

interface AnimateProps extends DivProps, WrapperProps, UseAnimateOptions {
  // $debugProps?: Array<boolean | keyof AnimateProps, cb: >// TODO
}

/**
 * @WrapperComponent a wrapper for web animation API
 */
export default function Animate({ children, /*  $debugProps, */ ...restProps }: AnimateProps) {
  // useEffect(() => {
  //   if (isTrue($debugProps)) {
  //     console.log(`<${Animate.name}> Props: `, restProps)
  //   }
  //   if (isString($debugProps)) {
  //     console.log(`<${Animate.name}> Prop ${$debugProps}: `, restProps[$debugProps])
  //   }
  // }, [$debugProps])
  return (
    <DomRef {...omit(restProps, animateOptionKeys)} extraDomRef={useAnimateRef(restProps)}>
      {children}
    </DomRef>
  )
}
