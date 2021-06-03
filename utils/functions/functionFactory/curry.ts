import overwriteFunctionName from "./overwriteFunctionName"

//TODO: 这个类型描述是抄的，感觉太过复杂了
type Tail<F extends Function, S extends Number> = S extends 0
  ? F extends (...args: infer TArgs) => any
    ? TArgs
    : never
  : S extends 1
  ? F extends (a: any, ...args: infer TArgs) => any
    ? TArgs
    : never
  : S extends 2
  ? F extends (a: any, b: any, ...args: infer TArgs) => any
    ? TArgs
    : never
  : S extends 3
  ? F extends (a: any, b: any, c: any, ...args: infer TArgs) => any
    ? TArgs
    : never
  : S extends 4
  ? F extends (a: any, b: any, c: any, d: any, ...args: infer TArgs) => any
    ? TArgs
    : never
  : S extends 5
  ? F extends (a: any, b: any, c: any, d: any, e: any, ...args: infer TArgs) => any
    ? TArgs
    : never
  : S extends 6
  ? F extends (a: any, b: any, c: any, d: any, e: any, f: any, ...args: infer TArgs) => any
    ? TArgs
    : never
  : never

type TailArray<A extends any[], S extends Number> = Tail<(...args: A) => any, S>

type Args<T extends Function> = T extends (...args: infer TArgs) => any ? TArgs : never

type PartialArgs<T extends Function> = T extends (...args: infer TArgs) => any
  ? Partial<TArgs>
  : never

type Curried<T extends (...args: any) => any, TReturn = ReturnType<T>> = <
  TArgs extends PartialArgs<T>,
  TRest extends TailArray<Args<T>, TArgs['length']>
>(
  ...args: TArgs
) => TRest extends [] ? TReturn : Curried<(...args: TRest) => TReturn>

type Curry = <F extends (...args: any) => any>(func: F) => Curried<F>

/**
 * 柯里化
 * @param fn 任意函数
 */
const curry: Curry = fn =>
  overwriteFunctionName(
    (...args) =>
      //@ts-ignore
      args.length < fn.length ? curry(fn.bind(undefined, ...args)) : fn(...args),
    fn.name.replace('bound', `[curried]`)
  )
export default curry
