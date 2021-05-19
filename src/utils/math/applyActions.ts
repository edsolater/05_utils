function applyActions<T, U>(n: T, actions: [(n: T) => U]): U
function applyActions<T, U, K>(n: T, actions: [(n: T) => U, (n: U) => K]): K // fixme: why type not work properly?
function applyActions<T, U, K, W>(n: T, actions: [(n: T) => U, (n: U) => K, (n: K) => W]): W
function applyActions<T>(n: T, actions: ((n: any) => any)[]): any {
  return actions.reduce((value, action) => action(value), n)
}
export default applyActions
