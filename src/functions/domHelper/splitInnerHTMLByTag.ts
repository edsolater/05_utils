/**
 * 纯函数
 * 分割innerHTML
 * @param canPaintInnerHTML 输入的innerHTML
 * @example
 * splitInnerHTMLByTag('这是<b>一段没</b>有<b>意义的文</b>字') // [ "这是", "<b>", "一段没", "</b>", "有", "<b>", "意义的文", "</b>", "字" ]
 */
export default function splitInnerHTMLByTag(canPaintInnerHTML: string) {
  return canPaintInnerHTML.replace(/(<.*?>)/g, '\0$1\0').split('\0');
}
