/**
 * 设定新函数名，并返回新函数
 * @param func 目标函数
 * @param name 设定的函数名
 */
export default function overwriteFunctionName<F extends Function>(func: F, name: string): F {
  const temp = {
    [name]: (...args) => func(...args)
  }
  return temp[name] as any
}
