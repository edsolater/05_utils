// SERENDIPITY: looks like this is Promise then chain
// Ask so, why not just use promise.prototype.then()？

import { AnyFn } from 'typings/constants'

// because the value can't get syncly
function fall<T, F1 extends (arg: T) => any>(n: T, actions: [F1]): ReturnType<F1>
function fall<T, F1 extends (arg: T) => any, F2 extends (arg: ReturnType<F1>) => any>(
  n: T,
  actions: [F1, F2]
): ReturnType<F2> // fixme: why type not work properly?
function fall<
  T,
  F1 extends (arg: T) => any,
  F2 extends (arg: ReturnType<F1>) => any,
  F3 extends (arg: ReturnType<F2>) => any
>(n: T, actions: [F1, F2, F3]): ReturnType<F3>
function fall<
  T,
  F1 extends (arg: T) => any,
  F2 extends (arg: ReturnType<F1>) => any,
  F3 extends (arg: ReturnType<F2>) => any,
  F4 extends (arg: ReturnType<F3>) => any
>(n: T, actions: [F1, F2, F3, F4]): ReturnType<F4>
function fall<
  T,
  F1 extends (arg: T) => any,
  F2 extends (arg: ReturnType<F1>) => any,
  F3 extends (arg: ReturnType<F2>) => any,
  F4 extends (arg: ReturnType<F3>) => any,
  F5 extends (arg: ReturnType<F4>) => any
>(n: T, actions: [F1, F2, F3, F4, F5]): ReturnType<F5>
function fall(n, actions: any[]) {
  return actions.reduce((value, action) => action(value), n)
}
export default fall

// TODO: test it !!!
interface _Fall<O, T = O> {
  originalValue: O
  actionStack: AnyFn[]
  then(cb: (nextValue: T) => any): _Fall<O, ReturnType<typeof cb>>
  exec(): T
}
export function Fall<T>(value: T, stack?: AnyFn[]) {
  const result: _Fall<T> = {
    originalValue: value,
    actionStack: stack ?? ([] as AnyFn[]),
    then(cb) {
      return Fall(value, result.actionStack.concat(cb))
    },
    exec() {
      return result.actionStack.reduce((value, action) => action(value), result.originalValue)
    }
  }
  return result
}
