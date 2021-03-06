import { CSSObject } from '@emotion/react'

export type StyleNames<T extends string[]> = { [name in T[number]]: CSSObject }

export type MayArray<T> = T | Array<T>

export type MayDeepArray<T> = undefined | T | Array<MayDeepArray<T>>

export type MayFunction<T> = T | (() => T)

/**
 * 能有enum提示，同时，传入其他string也不报错
 * @example
 * const e = MayEnum<'hello'|'world'> // 'hello' | 'world' | (string & {})
 */
export type MayEnum<T> = T | (string & {})

/**
 * type I = GetRequired<{ foo: number, bar?: string }> // expected to be { foo: number }
 */
// type GetRequired<T> = { [P in keyof T as T[P] extends Required<T>[P] ? P : never]: T[P] };

/**
 * type I = GetOptional<{ foo: number, bar?: string }> // expected to be { bar?: string }
 */
// type GetOptional<T> = {[P in keyof T as T[P] extends Required<T>[P] ? never: P]: T[P]}

// 获取对象的所有非方法的属性名
export type Properties<O, T = keyof O> = T extends keyof O
  ? O[T] extends () => void
    ? never
    : T
  : never
