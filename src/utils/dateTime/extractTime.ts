import formatDateString from './formatDateString'

/**
 * （快捷方式）只提取时间
 * @param dateString 日期字符串（可能来自后端）
 * @param options 配置对象
 * @param options.second 显示秒数
 * @example
 * extractTime('2020-08-24 18:54') // '18:54'
 */

export default function extractTime(dateString: string, options?: { second?: boolean }) {
  return formatDateString(dateString, options?.second ? 'HH:mm:ss' : 'HH:mm')
}
