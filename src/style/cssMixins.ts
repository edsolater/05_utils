import { ICSS } from 'baseUI/Div'

// TODO: 放预定义的各种CSS组合
export const cssMixins = {
  gridItemTextLabel: (): ICSS => ({
    textAlign: 'center',
    left: '50%',
    top: 0,
    fontSize: 34,
    margin:8,
    color: 'gray'
  }),
  testGridContainer: (): ICSS => ({
    display: 'grid',
    gridTemplate: '1fr 1fr / 1fr 1fr',
    gap: 8,
    overflow: 'hidden',
    background: 'lightgray',
    height: '100vh'
  }),
  testGridItem: (): ICSS => ({
    background: 'white',
    position: 'relative',
    overflow: 'hidden'
  })
}
export type AllMixins = typeof cssMixins
