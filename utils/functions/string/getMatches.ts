/**
 * 获取所有能匹配的所有子字符串
 * @param str 目标字符串
 * @param regex 正则
 * @returns 匹配到的字符串们
 * @example
 * getMatches('hello world', /\wo/) // ['lo', 'wo']
 */
export default function getMatches(str: string, regex: RegExp): string[] {
  return Array.from(str.match(new RegExp(regex, 'g')) ?? [])
}
