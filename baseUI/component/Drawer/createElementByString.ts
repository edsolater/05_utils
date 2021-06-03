export default function createElementByString<T extends HTMLElement = HTMLDivElement>(innerHTMLStr): T {
  const tempNode = document.createElement('div')
  tempNode.innerHTML = innerHTMLStr
  if (tempNode.firstElementChild === null) throw "can't create an element. Wrong string!"
  return tempNode.firstElementChild as any
}
