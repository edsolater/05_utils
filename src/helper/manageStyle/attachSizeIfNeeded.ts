/**
 * DOM操作：附上初始的长宽尺寸
 * @param el 目标元素
 */
export default function attachSizeIfNeeded(el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  if (!(el.style['width'] && /\d+px$/.test(el.style['width']))) {
    el.style['width'] = rect['width'] + 'px'
  }
  if (!(el.style['height'] && /\d+px$/.test(el.style['height']))) {
    el.style['height'] = rect['height'] + 'px'
  }
}
