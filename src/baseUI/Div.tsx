/** @jsx jsx */
import { jsx, css, Interpolation } from '@emotion/core'
import { FC, forwardRef, ReactNode, Ref } from 'react'
import { IFC } from 'typings/reactType'
import { MayArray } from 'typings/tools'
import { mergeRefs } from '../helper/reactHelper/mergeRefs'
export interface DivProps extends Omit<JSX.IntrinsicElements['div'], 'style'> {
  // 这会开启typescript的缓存机制
  // 对interface，typescript有缓存
  disabled?: boolean
  /**
   * 专门用于放css variable的
   */
  css?: MayArray<Interpolation>
  /**
   * 强制使用disabled的样式
   */
  cssVaraible?: {
    /**
     * 给translate的，表示在x轴偏移的方向
     */
    '--x'?: number
    /**
     * 给translate的，表示在y轴偏移的方向
     */
    '--y'?: number
    [variableName: string]: number | string | undefined
  } // TODO
  draggable?: boolean
}
export const allPropsName: ReadonlyArray<keyof DivProps> = ['css', 'disabled', 'cssVaraible']

const Div: IFC<DivProps> = ({
  disabled,
  css: emotionCss,
  draggable,
  cssVaraible = {},
  children,
  domRef,
  ...restProps
}) => {
  // // TODO: draggable droppable 都要支持
  // const currentRef = useRef<HTMLDivElement>()
  // useEffect(() => {
  //   if (draggable) {
  //     currentRef.current
  //   }
  // }, [])
  return (
    <div
      ref={mergeRefs(domRef /* currentRef */)}
      //@ts-expect-error 因为 css variable 势必造成不匹配的问题
      style={{ ...(disabled && { opacity: '.3', cursor: 'not-allowed' }), ...cssVaraible }}
      css={css(emotionCss)}
      draggable={draggable}
      {...restProps}
    >
      {children}
    </div>
  )
}

export default Div
