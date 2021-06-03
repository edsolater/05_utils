function applyActions<T, F1 extends (arg: T) => any>(n: T, actions: [F1]): ReturnType<F1>
function applyActions<T, F1 extends (arg: T) => any, F2 extends (arg: ReturnType<F1>) => any>(
  n: T,
  actions: [F1, F2]
): ReturnType<F2> // fixme: why type not work properly?
function applyActions<
  T,
  F1 extends (arg: T) => any,
  F2 extends (arg: ReturnType<F1>) => any,
  F3 extends (arg: ReturnType<F2>) => any
>(n: T, actions: [F1, F2, F3]): ReturnType<F3>
function applyActions<
  T,
  F1 extends (arg: T) => any,
  F2 extends (arg: ReturnType<F1>) => any,
  F3 extends (arg: ReturnType<F2>) => any,
  F4 extends (arg: ReturnType<F3>) => any
>(n: T, actions: [F1, F2, F3, F4]): ReturnType<F4>
function applyActions<
  T,
  F1 extends (arg: T) => any,
  F2 extends (arg: ReturnType<F1>) => any,
  F3 extends (arg: ReturnType<F2>) => any,
  F4 extends (arg: ReturnType<F3>) => any,
  F5 extends (arg: ReturnType<F4>) => any
>(n: T, actions: [F1, F2, F3, F4, F5]): ReturnType<F5>
function applyActions(n, actions: any[]) {
  return actions.reduce((value, action) => action(value), n)
}
export default applyActions
