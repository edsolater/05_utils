import ReactDOM from 'react-dom'
import { useEffect, useRef } from 'react'
import { ReactProps } from 'typings/constants'

function createElementByString<T extends HTMLElement = HTMLDivElement>(innerHTMLStr): T {
  const tempNode = document.createElement('div')
  tempNode.innerHTML = innerHTMLStr
  if (tempNode.firstElementChild === null) throw "can't create an element. Wrong string!"
  return tempNode.firstElementChild as any
}

const drawerCardRoot = createElementByString(
  '<div id="drawer-card-root" style="position:fixed; inset:0; pointer-events: none"></div>'
)
document.body.append(drawerCardRoot)

/**
 * @todo 感觉这个文件应该提出去，不应该再在DrawerCard文件夹中
 * @SideEffectSubComponent
 * @description 每次有调用，会生成一个 <DrawerCardProtal> 在 drawerCard-root
 *
 * 以后包裹此protal会生成类似于下述的数据结构:
 *
 * <div id="drawer-card-root>
 *    <div class="drawerCard-protal">
 *        {children}
 *    </div>
 *    <div class="drawerCard-protal">
 *        {children}
 *    </div>
 * </div>
 */
const DrawerCardProtal = (props: ReactProps) => {
  const wrapperDiv = useRef(createElementByString('<div style="display:contents"></div>'))

  useEffect(() => {
    drawerCardRoot.append(wrapperDiv.current)
    return () => wrapperDiv.current.remove()
  }, [])

  return ReactDOM.createPortal(props.children, wrapperDiv.current)
}

export default DrawerCardProtal
