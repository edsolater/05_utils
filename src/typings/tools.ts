import { Interpolation } from '@emotion/core'

export type StyleNames<T extends string[]> = { [name in T[number]]: Interpolation }

export type MayArray<T> = T | Array<T>

export type MayFunction<T> = T | (() => T)

