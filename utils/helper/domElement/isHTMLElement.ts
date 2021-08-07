import isObjectLike from '@edsolater/fnkit/dist/judgers/isObjectOrArray'

export default function isHTMLElement(value: any): value is HTMLElement {
  return isObjectLike(value) && Boolean((value as { tagName: string }).tagName)
}
