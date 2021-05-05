import { CSSObject } from '@emotion/react'

export type StyleNames<T extends string[]> = { [name in T[number]]: CSSObject }

export type MayArray<T> = T | Array<T>

export type MayDeepArray<T> = T | Array<MayDeepArray<T>>

export type MayDeepReadOnlyArray<T> = T | ReadonlyArray<MayDeepReadOnlyArray<T>>

export type MayFunction<T> = T | (() => T)

/**
 * 能有enum提示，同时，传入其他string也不报错
 * @example
 * const e = MayEnum<'hello'|'world'> // 'hello' | 'world' | (string & {})
 */
export type SuggestString<T> = T | (string & {})

/**
 * type I = GetRequired<{ foo: number, bar?: string }> // expected to be { foo: number }
 */
// type GetRequired<T> = { [P in keyof T as T[P] extends Required<T>[P] ? P : never]: T[P] };

/**
 * type I = GetOptional<{ foo: number, bar?: string }> // expected to be { bar?: string }
 */
// type GetOptional<T> = {[P in keyof T as T[P] extends Required<T>[P] ? never: P]: T[P]}

/**
 * 获取对象的所有非方法的属性名
 * @example
 * Properties<{a: number, b: true, c(): boolean}> // 'a' | 'b'
 */
export type Properties<O, T = keyof O> = T extends keyof O
  ? O[T] extends () => void
    ? never
    : T
  : never

/**
 * 获取对象的所有方法名
 * @example
 * Properties<{a: number, b: true, c(): boolean}> // 'c'
 */
export type Methods<O> = Exclude<keyof O, Properties<O>>

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: undefined }
/**
 * 两个类型互斥（只能二选一）
 * @example
 * type F = XOR<{ d: '2' }, { a: 1; b: true; c(): boolean }>
 * const d: F = { a: 1, b: true, c: () => true } // OK
 * const d: F = { d: '2' } // OK
 * const d: F = { a: 1, b: true, c: () => true, d: '2' } // Error
 */
export type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U