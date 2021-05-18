/**
 * @mutable
 *
 * 给配置对象添加默认值（改变原对象）
 */
export default function addDefault<T extends object, U extends Partial<T>>(
  initConfig: T,
  defaultConfig: U
): asserts initConfig is T & U {
  const storedInitConfig = { ...(initConfig ?? {}) }
  Object.assign(initConfig, defaultConfig, storedInitConfig)
}
