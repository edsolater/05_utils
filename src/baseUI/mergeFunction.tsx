import { AnyFn } from 'typings/constants';

/**
 * @todo it's type intelligense is not very smart for parameters
 * @example
 * const add = (a: number, b: number) => a + b
 * const multi = (a: number) => 3 + a
 * const c = mergeFunction(add, multi) // (a: number, b: number) => {add(a, b); multi(a, b)}
 */
export default function mergeFunction<T extends AnyFn>(...fns: [T]): (...params: Parameters<T>) => void;
export default function mergeFunction<T extends AnyFn, U extends AnyFn | undefined>(
  ...fns: [T, U]
): (...params: Parameters<T>) => void;
export default function mergeFunction<T extends AnyFn, U extends AnyFn | undefined, W extends AnyFn | undefined>(
  ...fns: [T, U, W]
): (...params: Parameters<T>) => void;
export default function mergeFunction<
  T extends AnyFn,
  U extends AnyFn | undefined,
  W extends AnyFn | undefined,
  K extends AnyFn | undefined
>(...fns: [T, U, W, K]): (...params: Parameters<T>) => void;
export default function mergeFunction<
  T extends AnyFn,
  U extends AnyFn | undefined,
  W extends AnyFn | undefined,
  K extends AnyFn | undefined,
  V extends AnyFn | undefined
>(...fns: [T, U, W, K, V]): (...params: Parameters<T>) => void;
export default function mergeFunction<T extends AnyFn>(...fns: T[]): (...params: Parameters<T>) => void {
  return (...params) => {
    fns.forEach((fn) => fn?.(...params));
  };
}
