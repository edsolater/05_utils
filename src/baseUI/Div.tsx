/** @jsx jsx */
import { jsx, CSSObject, css } from '@emotion/react'
import { CSSProperties } from 'react'
import { IFC } from 'typings/reactType'
import { MayDeepArray } from 'typings/tools'
import { mergeRefs } from '../helper/reactHelper/mergeRefs'
export type ICSS = MayDeepArray<CSSObject> // 因为每次组件props传递可能是会导致更深层的传递
export interface DivProps extends Omit<JSX.IntrinsicElements['div'], 'style' | 'css'> {
  // 这会开启typescript的缓存机制
  // 对interface，typescript有缓存
  css?: ICSS
  /**
   * 在原来style的基础上，增加了对css variable的type类型的支持
   * 其实就是元素的style
   */
  style?:
    | CSSProperties
    | {
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
export const allPropsName: ReadonlyArray<keyof DivProps> = ['css', 'style']

const Div: IFC<DivProps> = ({
  css: emotionCss,
  draggable,
  style,
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
      style={style}
      css={css(emotionCss)}
      draggable={draggable}
      {...restProps}
    >
      {children}
    </div>
  )
}

export default Div
