/**
 * 检查对象是否具有某个属性
 * @param obj 目标对象
 * @param propName 属性名
 */
export default function hasProperty(obj: object, propName: string) {
  return propName in obj
}
