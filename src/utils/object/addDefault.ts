/**
 * @mutable
 *
 * 给配置对象添加默认值（改变原对象）
 */
export default function addDefault<T extends object>(
  initConfig: T,
  defaultConfig: Required<T>
): Required<T> {
  const storedInitConfig = { ...(initConfig ?? {}) }
  const result = Object.assign(initConfig, defaultConfig, storedInitConfig)
  return result
}
