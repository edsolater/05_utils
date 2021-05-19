/**
 * @mutable
 *
 * add default config object to original object. (will mutate object)
 */
export default function addDefault<T extends object, U extends Partial<T>>(
  initConfig: T,
  defaultConfig: U
): asserts initConfig is T & U {
  const storedInitConfig = { ...(initConfig ?? {}) }
  Object.assign(initConfig, defaultConfig, storedInitConfig)
}
