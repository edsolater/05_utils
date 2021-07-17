import { CSSObject } from '@emotion/react'

export type StyleNames<T extends string[]> = { [name in T[number]]: CSSObject }

export type MayArray<T> = T | Array<T>

export type MayDeepArray<T> = T | Array<MayDeepArray<T>>

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

/**
 * 只选取满足条件的属性名
 * @example
 * PickByValue<{a: boolean, b: boolean, c: string}, boolean> // {a: boolean, b: boolean}
 */
export type PickByValue<T, U> = { [P in keyof T]: T[P] extends U ? P : never }[keyof T]

/**
 * 只选取不满足条件的属性名
 * @example
 * OmitByValue<{a: undefined, b: undefined, c: string}, undefined> // {c: string}
 */
export type OmitByValue<T, U> = { [P in keyof T]: T[P] extends U ? never : P }[keyof T]

/**
 * 删除 属性值为undefined的属性
 * @example
 * NotUndefinedValue<{a: number, b: never}> // {a: number}
 */
export type NotUndefinedValue<O> = {
  [Q in OmitByValue<O, undefined>]: O[Q]
}

/**
 * @example
 * PascalCaseFromKebabCase<'hello-world'> // 'HelloWrold'
 * PascalCaseFromKebabCase<'hello-world-hi'> // 'HelloWroldHi'
 * PascalCaseFromKebabCase<'hello-world-hi-i'> // 'HelloWroldHiI'
 * PascalCaseFromKebabCase<'hello-world-hi-I-am'> // 'HelloWroldHiIAm'
 * PascalCaseFromKebabCase<'hello-world-hi-I-am-Ed'> // 'HelloWroldHiIAmEd'
 */
export type PascalCaseFromKebabCase<
  S extends string
> = S extends `${infer p1}-${infer p2}-${infer p3}-${infer p4}-${infer p5}-${infer p6}-${infer p7}`
  ? `${Capitalize<p1>}${Capitalize<p2>}${Capitalize<p3>}${Capitalize<p4>}${Capitalize<p5>}${Capitalize<p6>}${Capitalize<p7>}`
  : S extends `${infer p1}-${infer p2}-${infer p3}-${infer p4}-${infer p5}-${infer p6}`
  ? `${Capitalize<p1>}${Capitalize<p2>}${Capitalize<p3>}${Capitalize<p4>}${Capitalize<p5>}${Capitalize<p6>}`
  : S extends `${infer p1}-${infer p2}-${infer p3}-${infer p4}-${infer p5}`
  ? `${Capitalize<p1>}${Capitalize<p2>}${Capitalize<p3>}${Capitalize<p4>}${Capitalize<p5>}`
  : S extends `${infer p1}-${infer p2}-${infer p3}-${infer p4}`
  ? `${Capitalize<p1>}${Capitalize<p2>}${Capitalize<p3>}${Capitalize<p4>}`
  : S extends `${infer p1}-${infer p2}-${infer p3}`
  ? `${Capitalize<p1>}${Capitalize<p2>}${Capitalize<p3>}`
  : S extends `${infer p1}-${infer p2}`
  ? `${Capitalize<p1>}${Capitalize<p2>}`
  : S

/**
 * @example
 * PascalCaseFromCamelCase<'helloWorld'> // 'HelloWrold'
 */
export type PascalCaseFromCamelCase<S extends string> = Capitalize<S>

/**
 * @example
 * PascalCase<'helloWorld'> // 'HelloWrold'
 * PascalCase<'helloWorldHi'> // 'HelloWroldHi'
 * PascalCase<'hello-world'> // 'HelloWrold'
 * PascalCase<'hello-world-hi'> // 'HelloWroldHi'
 * PascalCase<'hello-world-hi-i'> // 'HelloWroldHiI'
 * PascalCase<'hello-world-hi-I-am'> // 'HelloWroldHiIAm'
 * PascalCase<'hello-world-hi-I-am-Ed'> // 'HelloWroldHiIAmEd'
 */
export type PascalCase<S extends string> = PascalCaseFromKebabCase<Capitalize<S>>

/**
 * @example
 * PascalCaseFromKebabCase<'hello-world'> // 'helloWrold'
 * PascalCaseFromKebabCase<'hello-world-hi'> // 'helloWroldHi'
 * PascalCaseFromKebabCase<'hello-world-hi-i'> // 'helloWroldHiI'
 * PascalCaseFromKebabCase<'hello-world-hi-I-am'> // 'helloWroldHiIAm'
 * PascalCaseFromKebabCase<'hello-world-hi-I-am-Ed'> // 'helloWroldHiIAmEd'
 */
export type CamelCaseFromKebabCase<
  S extends string
> = S extends `${infer p1}-${infer p2}-${infer p3}-${infer p4}-${infer p5}-${infer p6}-${infer p7}`
  ? `${Uncapitalize<p1>}${Capitalize<p2>}${Capitalize<p3>}${Capitalize<p4>}${Capitalize<p5>}${Capitalize<p6>}${Capitalize<p7>}`
  : S extends `${infer p1}-${infer p2}-${infer p3}-${infer p4}-${infer p5}-${infer p6}`
  ? `${Uncapitalize<p1>}${Capitalize<p2>}${Capitalize<p3>}${Capitalize<p4>}${Capitalize<p5>}${Capitalize<p6>}`
  : S extends `${infer p1}-${infer p2}-${infer p3}-${infer p4}-${infer p5}`
  ? `${Uncapitalize<p1>}${Capitalize<p2>}${Capitalize<p3>}${Capitalize<p4>}${Capitalize<p5>}`
  : S extends `${infer p1}-${infer p2}-${infer p3}-${infer p4}`
  ? `${Uncapitalize<p1>}${Capitalize<p2>}${Capitalize<p3>}${Capitalize<p4>}`
  : S extends `${infer p1}-${infer p2}-${infer p3}`
  ? `${Uncapitalize<p1>}${Capitalize<p2>}${Capitalize<p3>}`
  : S extends `${infer p1}-${infer p2}`
  ? `${Uncapitalize<p1>}${Capitalize<p2>}`
  : S

/**
 * @example
 * CamelCaseFromPascalCase<'HelloWorld'> // 'helloWrold'
 */
export type CamelCaseFromPascalCase<S extends string> = Uncapitalize<S>

/**
 * @example
 * CamelCase<'helloWorld'> // 'HelloWrold'
 * CamelCase<'helloWorldHi'> // 'HelloWroldHi'
 * CamelCase<'hello-world'> // 'HelloWrold'
 * CamelCase<'hello-world-hi'> // 'HelloWroldHi'
 * CamelCase<'hello-world-hi-i'> // 'HelloWroldHiI'
 * CamelCase<'hello-world-hi-I-am'> // 'HelloWroldHiIAm'
 * CamelCase<'hello-world-hi-I-am-Ed'> // 'HelloWroldHiIAmEd'
 */
export type CamelCase<S extends string> = CamelCaseFromKebabCase<Uncapitalize<S>>
