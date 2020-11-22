/**
 * 函数生成器：生成获取对象的属性值的函数
 * @param propertyName 需要获取的属性名
 */
export default function extract<T extends object, P extends keyof T>(propertyName: P) {
  return (obj: T) => obj[propertyName];
}
