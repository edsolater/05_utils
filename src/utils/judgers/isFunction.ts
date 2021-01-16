/**
 * 
 * 类别: typegard
 * 
 * 检测一个值是否是可调用的函数（强行认为所有函数都是可调用的）
 * 
 * @param value 需要检测的值
 */
export default function isFunction(value: unknown): value is (...any: any[]) => void {
  return typeof value === 'function';
}
