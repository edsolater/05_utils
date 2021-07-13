import { CSSObject } from '@emotion/react'
import { ICSS } from './cssParser'
export type AllMixinNames = keyof typeof cssMixins
const cssMixins = {
  gridItemTextLabel: (opt: { fontSize?: CSSObject['fontSize'] } = {}) =>
    ({
      textAlign: 'center',
      left: '50%',
      top: 0,
      fontSize: opt.fontSize ?? 34,
      margin: 8,
      color: 'gray'
    } as ICSS),
  testGridContainer: () =>
    ({
      display: 'grid',
      gridTemplate: '1fr 1fr / 1fr 1fr 1fr',
      gap: 8,
      overflow: 'hidden',
      background: 'lightgray',
      height: '100vh'
    } as ICSS),
  testGridItem: () =>
    ({
      background: 'white',
      position: 'relative',
      overflow: 'hidden'
    } as ICSS),

  /**禁止 flexItem 伸缩 */
  solidFlexItem: () =>
    ({
      flex: '0 0 auto'
    } as ICSS),

  /**组件禁用滚动条 */
  noScrollbar: () =>
    ({
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        display: 'none'
      }
    } as ICSS),

  /**横向布局 */
  horizontalLayout: ({
    gap = 8,
    justifyContent = 'center'
  }: {
    gap?: CSSObject['gap']
    justifyContent?: CSSObject['justifyContent']
  } = {}) =>
    ({
      display: 'flex',
      justifyContent,
      gap
    } as ICSS),

  /**表明此元素是个button */
  buttonStyle: ({}: {} = {}) =>
    ({
      cursor: 'pointer',
      userSelect: 'none',
      ':hover': {
        filter: `brightness(0.9)`,
        transform: `scale(1.1)`
      },
      ':active': {
        filter: `brightness(0.8)`,
        transform: `scale(0.9)`
      }
    } as ICSS)
}
export default cssMixins
