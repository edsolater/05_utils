/**
 * the same as Object.fromEntries()
 * @example
 * 
 * fromEntries([
 *   ['foo', 'bar'],
 *   ['baz', 42]
 * ] as const) // { foo: "bar", baz: 42 }
 * 
 * @todo
 * fromEntries(new Map([
 *   ['foo', 'bar'],
 *   ['baz', 42]
 * ])) // { foo: "bar", baz: 42 }
 * @todo add various collection data struction support (like:Map, set, array...)
 */
export default function fromEntries<T>(entries: T): FromEntries<T> {
  // @ts-expect-error
  return Object.fromEntries(entries)
}

/**
 * This generic help us to bypass the typescript compiler for passing invalid types.
 * @example
 * type T4 = Cast<string | number, boolean> // boolean
 * type T5 = Cast<string | number, string> // string
 * type T6 = Cast<'hello', string> // 'hello'
 * type T7 = Cast<'hello' | 'world', string> // 'hello' | 'world'
 */
type Cast<X, Y> = X extends Y ? X : Y

/**
 * delete readonly decorator by 'as const'
 * @example
 * const data = [['key1', 1], ['key2', 2]] as const
 * type Data = typeof data //  readonly [readonly ["key1", 1], readonly ["key2", 2]]
 * const data = [['key1', 1], ['key2', 2]] as const
 * type Data = DeepWitable<typeof data> //  [['key1', 1], ['key2', 2]]
 */
type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> }

/**
 * main Generic: for Object.fromEntries()
 * @example
 * type ResFromEntries = FromEntries<[['key1', 'value1'], ['key2', 3]]> // {key1: "value1"; key2: 3}
 *
 * const data = [['key1', 1], ['key2', 2]] as const
 * type Data = DeepWriteable<typeof data>
 * type Res = FromEntries<Data> // {key1: "value1"; key2: 3}
 */
type FromEntries<U, T = DeepWriteable<U>> = T extends Array<[infer Key, any]>
  ? { [P in Cast<Key, string>]: Extract<T[number], [P, any]>[1] }
  : { [p in string]: unknown }

