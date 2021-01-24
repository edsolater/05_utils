import { Interpolation } from '@emotion/core'

export type StyleNames<T extends string[]> = { [name in T[number]]: Interpolation }

export type MayArray<T> = T | Array<T>

export type MayFunction<T> = T | (() => T)

export type ObjectValues<O extends object, K = keyof O> = K extends keyof O ? O[K] : never

export type GetKeysFromValues<
  O extends object,
  V extends ObjectValues<O>,
  K = keyof O
> = K extends keyof O ? (O[K] extends V ? K : never) : never

/**
 * interface Cat {
 *   type: 'cat'
 *   breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
 * }
 * 
 * interface Dog {
 *   type: 'dog'
 *   breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
 *   color: 'brown' | 'white' | 'black'
 * }
 * 
 * type MyDogType = LookUp<Cat | Dog, 'dog'> // expected to be `Dog`
 */
export type LookUp<U, T extends string> = {
  [K in T]: U extends { type: T } ? U : never
}[T]

/**
 * type I = GetRequired<{ foo: number, bar?: string }> // expected to be { foo: number }
 */
// type GetRequired<T> = { [P in keyof T as T[P] extends Required<T>[P] ? P : never]: T[P] };

/**
 * type I = GetOptional<{ foo: number, bar?: string }> // expected to be { bar?: string }
 */
// type GetOptional<T> = {[P in keyof T as T[P] extends Required<T>[P] ? never: P]: T[P]}