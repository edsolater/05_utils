/** @jsx jsx */
import { jsx, css, Interpolation } from '@emotion/core'
import { forwardRef, } from 'react'
import { MayArray } from 'typings/tools'
import { mergeRefs } from '../helper/reactHelper/mergeRefs'
export type CSSProperties = MayArray<Interpolation>
export type DivProps = {
  disabled?: boolean
  /**
   * 专门用于放css variable的
   */
  css?: CSSProperties
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

const Div = forwardRef<any, Omit<JSX.IntrinsicElements['div'], 'style'> & DivProps>(
  ({ disabled, css: emotionCss, draggable, cssVaraible = {}, children, ...restProps }, ref) => {
    // // TODO: draggable droppable 都要支持
    // const currentRef = useRef<HTMLDivElement>()
    // useEffect(() => {
    //   if (draggable) {
    //     currentRef.current
    //   }
    // }, [])
    return (
      <div
        ref={mergeRefs([ref /* currentRef */])}
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
)

export default Div
