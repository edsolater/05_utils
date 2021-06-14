import ReactDOM from 'react-dom'
import { ReactNode, useEffect, useRef } from 'react'
import createElement from '../functions/createElement'
import { addDefault } from 'utils/functions/magic'

// TODO: to be extract to a function
const ProtalRoot = createElement({
  className: 'protal-root',
  style: { position: 'fixed', inset: '0', pointerEvents: 'none' }
})
const sheet = window.document.styleSheets[0]
sheet.insertRule('.protal-root > * { pointer-events: initial }')
document.body.append(ProtalRoot)

/**
 * 每次有调用，会生成一个 小<Protal> 生成在 popup-root
 */
export default function Protal(props: {
  protalName?: string
  children?: ReactNode
  hidden?: boolean
  zIndex?: number
}) {
  const sprops = addDefault(props, { zIndex: 0 })
  const wrapperDiv = useRef(
    createElement({
      className: sprops.protalName,
      style: { display: 'contents', zIndex: sprops.zIndex }
    })
  )

  useEffect(() => {
    if (sprops.hidden) return
    ProtalRoot.append(wrapperDiv.current)
    return () => {
      wrapperDiv.current.remove()
    }
  }, [sprops.children])
  return sprops.hidden ? null : ReactDOM.createPortal(sprops.children, wrapperDiv.current)
}
