import isObject from 'functions/judgers/isObject'

export default function isHTMLElement(value: any): value is HTMLElement {
  return isObject(value) && Boolean((value as { tagName: string }).tagName)
}
