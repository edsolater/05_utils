import isObjectLike from 'utils/judgers/isObjectLike'

export default function isHTMLElement(value: any): value is HTMLElement {
  return isObjectLike(value) && Boolean((value as { tagName: string }).tagName)
}
