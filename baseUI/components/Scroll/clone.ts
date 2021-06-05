/**浅复制object */
export function clone<T extends object>(a: T): T {
  return { ...a };
}
