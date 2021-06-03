import { CSSObject } from '@emotion/react';
import { cssBrightness, cssScale } from './cssFunctions';
import { ICSS } from './ICSS';
export type AllMixinNames = keyof typeof cssMixins
export const cssMixins = {
  gridItemTextLabel: (opt: { fontSize?: CSSObject['fontSize']; } = {}) => ICSS(
    {
      textAlign: 'center',
      left: '50%',
      top: 0,
      fontSize: opt.fontSize ?? 34,
      margin: 8,
      color: 'gray'
    },
    '业务样式：测试的文字'
  ),
  testGridContainer: () => ICSS(
    {
      display: 'grid',
      gridTemplate: '1fr 1fr / 1fr 1fr 1fr',
      gap: 8,
      overflow: 'hidden',
      background: 'lightgray',
      height: '100vh'
    },
    '业务样式： 网格的父盒子'
  ),
  testGridItem: () => ICSS({
    background: 'white',
    position: 'relative',
    overflow: 'hidden'
  }),

  /**禁止 flexItem 伸缩 */
  solidFlexItem: () => ICSS({
    flex: '0 0 auto'
  }),

  /**组件禁用滚动条 */
  noScrollbar: () => ICSS({
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  }),

  /**横向布局 */
  horizontalLayout: ({
    gap = 8,
    justifyContent = 'center'
  }: {
    gap?: CSSObject['gap'];
    justifyContent?: CSSObject['justifyContent'];
  } = {}) => ICSS({
    display: 'flex',
    justifyContent,
    gap
  }),

  /**表明此元素是个button */
  buttonStyle: ({ }: {} = {}) => ICSS({
    cursor: 'pointer',
    userSelect: 'none',
    ':hover': {
      filter: cssBrightness(0.9),
      transform: cssScale(1.1)
    },
    ':active': {
      filter: cssBrightness(0.8),
      transform: cssScale(0.9)
    }
  })
};
