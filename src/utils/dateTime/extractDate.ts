import formatDateString from './formatDateString'

/**
 * （快捷方式）只提取日期
 * @param dateString 日期字符串（可能来自后端）
 * @param options 配置对象
 * @param options.year 显示年
 * @example
 * extractDate('2020-08-24 18:54') // '2020-08-24'
 */

export default function extractDate(dateString: string, options?: { year?: boolean }) {
  return formatDateString(dateString, options?.year ? 'YYYY-MM-DD' : 'MM-DD')
}
