import { Interpolation } from '@emotion/core'

// TODO: 放预定义的各种CSS组合
export const allCSSMixins = {
  gridItemTextLabel: (): Interpolation => ({
    position: 'absolute',
    left: '50%',
    top: 0,
    transform: 'translateX(-50%)',
    fontSize: 34,
    color: 'gray'
  }),
  testGridContainer: (): Interpolation => ({
    display: 'grid',
    gridTemplate: '1fr 1fr / 1fr 1fr',
    gap: 8,
    overflow: 'hidden',
    background: 'lightgray',
    height: '100vh'
  }),
  testGridItem: (): Interpolation => ({
    background: 'white',
    position: 'relative',
    overflow: 'hidden'
  })
} 
export type AllMixins = ['']
export function applyMixins(
  mixins: { [mixinName in keyof typeof allCSSMixins]?: Parameters<typeof allCSSMixins[mixinName]> }
): Interpolation {
  return Object.entries(mixins)
    .map(([mixinName, mixinParams]) => allCSSMixins[mixinName]([...(mixinParams ?? [])]))
    .reduce((acc, cssRules) => ({ ...acc, ...cssRules }), {})
}
