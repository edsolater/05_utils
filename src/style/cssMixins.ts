import { Interpolation } from '@emotion/react'
import isArray from 'utils/judgers/isArray'
import isFunction from 'utils/judgers/isFunction'
import isObjectLiteral from 'utils/judgers/isObjectLiteral'
import isString from 'utils/judgers/isString'

// TODO: 放预定义的各种CSS组合
export const cssMixins = {
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
type AllMixins = typeof cssMixins

export type MixinItem =
  | { [mixinName in keyof AllMixins]?: Parameters<AllMixins[mixinName]> }
  | AllMixins[keyof AllMixins]
  | keyof AllMixins
export function mix(...mixins: MixinItem[]): Interpolation {
  const resultCssObject = {}
  for (const mixinItem of mixins) {
    if (isFunction(mixinItem)) {
      Object.assign(resultCssObject, mixinItem())
    } else if (isArray(mixinItem)) {
      Object.assign(resultCssObject, mix(mixinItem))
    } else if (isObjectLiteral(mixinItem)) {
      Object.assign(
        resultCssObject,
        Object.entries(mixinItem)
          .map(([mixinName, mixinParams]) => cssMixins[mixinName](...(mixinParams ?? [])))
          .reduce((acc, cssRules) => ({ ...acc, ...cssRules }), {})
      )
    } else if (isString(mixinItem)) {
      Object.assign(resultCssObject, cssMixins[mixinItem]())
    }
  }
  return resultCssObject
}
