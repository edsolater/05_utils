import { ID } from 'typings/constants'

/**
 * 随机
 * 产生一个5位数数字字符串的id
 */
export default function randomCreateId(): ID {
  return String('aa' + Math.round(+Math.random().toFixed(4) * 10000))
}
