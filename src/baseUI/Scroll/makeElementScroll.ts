/**令元素滚动 */
export default function makeElementScroll(el: HTMLElement, options: { offset: number }) {
  el.scrollBy({
    left: options.offset * el.clientWidth,
    behavior: 'smooth'
  })
}
