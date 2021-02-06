import { ICSS } from 'baseUI/Div'
export type AllMixinNames = keyof typeof cssMixins

// TODO: 放预定义的各种CSS组合
export const cssMixins = {
  gridItemTextLabel: (opt: { size?: number } = {}) =>
    ({
      textAlign: 'center',
      left: '50%',
      top: 0,
      fontSize: opt.size ?? 34,
      margin: 8,
      color: 'gray'
    } as ICSS),
  testGridContainer: () =>
    ({
      display: 'grid',
      gridTemplate: '1fr 1fr / 1fr 1fr',
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
    } as ICSS)
}
