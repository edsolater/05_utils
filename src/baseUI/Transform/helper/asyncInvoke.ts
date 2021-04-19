export default function asyncInvoke<T extends Array<any>>(
  fn: ((...any: T) => any) | undefined,
  ...args: T
): void {
  window.requestIdleCallback(() => fn?.(...args))
}
