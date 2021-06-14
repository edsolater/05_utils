import ReactDOM from 'react-dom'
import { ReactNode, useEffect, useRef } from 'react'
import { createElement, createMaskRoot } from '../../functions/createElement'

const maskRoot = createMaskRoot()
document.body.append(maskRoot)

const reactNodeStack: ReactNode[] = []
/**
 * @todo 感觉这个文件应该提出去，不应该再在Mask文件夹中
 * @SideEffectSubComponent
 * @description 每次有调用，会生成一个 <MaskProtal> 在 mask-root
 *
 * 以后包裹此protal会生成类似于下述的数据结构:
 *
 * <div id="mask-root>
 *    <div class="mask-protal">
 *        {children}
 *    </div>
 *    <div class="mask-protal">
 *        {children}
 *    </div>
 * </div>
 */
const MaskProtal = (props: { children?: ReactNode; hidden?: boolean }) => {
  const wrapperDiv = useRef(
    createElement({ className: 'mask-box', style: { display: 'contents' } })
  )

  useEffect(() => {
    if (props.hidden) return
    maskRoot.append(wrapperDiv.current)
    const idx = reactNodeStack.push(props.children) - 1
    return () => {
      wrapperDiv.current.remove()
      reactNodeStack.splice(idx, 1, undefined)
    }
  }, [props.children])
  return props.hidden ? null : ReactDOM.createPortal(props.children, wrapperDiv.current)
}

export default MaskProtal
