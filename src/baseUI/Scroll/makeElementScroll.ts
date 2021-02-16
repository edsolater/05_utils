/**令元素滚动 */
export default function makeElementScroll(
  el: HTMLElement,
  options: { offset: number; mode?: 'by' | 'to' }
) {
  const mode = options.mode ?? 'by'
  if (mode === 'by')
    el.scrollBy({
      left: options.offset,
      behavior: 'smooth'
    })
  if (mode === 'to')
    el.scrollTo({
      left: options.offset,
      behavior: 'smooth'
    })
}
