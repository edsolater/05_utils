/**
 * @mutable
 *
 * add default config object to original object. (will mutate object)
 */
export default function addDefault_mutable<T extends object, U extends Partial<T>>(
  initConfig: T,
  defaultConfig: U
): asserts initConfig is T & U {
  const storedInitConfig = { ...(initConfig ?? {}) }
  Object.assign(initConfig, defaultConfig, storedInitConfig) // TODO：这只是浅复制，不好。需要一个mergeDeep函数
}
