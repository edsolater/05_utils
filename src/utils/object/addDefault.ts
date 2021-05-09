/** 给配置对象添加默认值 */
export default function addDefault<T extends object | undefined>(
  initConfig: T,
  defaultConfig: Partial<NonNullable<T>>
): NonNullable<T> {
  return { ...defaultConfig, ...initConfig } as NonNullable<T>
}
/** 给配置对象添加默认值（改变原对象） */
export function addDefaultMutably<T extends object | undefined>(
  initConfig: T,
  defaultConfig: Partial<NonNullable<T>>
): void {
  const storedInitConfig = { ...(initConfig ?? {}) }
  Object.assign(initConfig, defaultConfig, storedInitConfig)
}
