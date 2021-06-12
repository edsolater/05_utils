/** 给配置对象添加默认值 */
export default function addDefault<T extends object>(initConfig: T, defaultConfig: Partial<T>): T {
  return { ...defaultConfig, ...initConfig }
}
/** 给配置对象添加默认值（改变原对象） */
export function addDefaultMutably<T extends object>(
  initConfig: T,
  defaultConfig: Partial<T>
): void {
  const storedInitConfig = { ...initConfig }
  Object.assign(initConfig, defaultConfig, storedInitConfig)
}
