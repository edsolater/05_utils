import { Interpolation } from '@emotion/core'

export type StyleNames<T extends string[]> = { [name in T[number]]: Interpolation }

export type MayArray<T> = T | Array<T>

export type MayFunction<T> = T | (() => T)

export type Values<O extends object, K = keyof O> = K extends keyof O ? O[K] : never

export type GetKeysFromValues<
  O extends object,
  V extends Values<O>,
  K = keyof O
> = K extends keyof O ? (O[K] extends V ? K : never) : never
