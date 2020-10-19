/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { FC, ReactElement, useLayoutEffect, useRef, useState } from 'react'

let range: Range | undefined
function cursorToLast(commonAncestor: HTMLElement) {
  const newRange = document.createRange()
  newRange.selectNodeContents(commonAncestor) //range的开始与结束的公共父节点
  newRange.collapse(false)
  const selection = window.getSelection()
  selection?.removeAllRanges()
  selection?.addRange(newRange)
}
/**
 * 想做个富文本编辑器
 */
const RichEditor: FC<{ clildren?: ReactElement }> = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [innerHTML, setInnerHTML] = useState('hello world')
  useLayoutEffect(() => {
    if (containerRef.current) cursorToLast(containerRef.current)
  }, [innerHTML])
  return (
    <div
      ref={containerRef}
      css={css({
        backgroundColor: '#eee',
        outline: 'none',
        img: {
          display: 'block',
          maxHeight: 300,
          maxWidth: 300
        }
      })}
      onInput={({ target }) => {
        setInnerHTML((target as HTMLDivElement).innerHTML)
      }}
      // onKeyDown={e => {
      //   if (e.ctrlKey && e.key.toLowerCase() === 'b') {
      //     // 阻止弹出我的收藏夹文件夹
      //     e.preventDefault()

      //     const selection = window.getSelection()
      //     // 选区的范围
      //     const range = selection?.getRangeAt(0)
      //     if (selection && containerRef.current) {
      //       const start = selection.anchorOffset
      //       const end = selection.focusOffset
      //       const rangeText = selection.getRangeAt(0).toString()
      //       const parentNode = selection.anchorNode?.parentElement
      //       const parentTextNode = selection.anchorNode as Text

      //       const b = document.createElement('b')
      //       b.appendChild(document.createTextNode(rangeText))
      //       parentNode?.insertBefore(b, parentTextNode.splitText(start))
      //       parentNode?.removeChild(parentTextNode.splitText(end))
      //     }
      //   }
      // }}
      contentEditable
      dangerouslySetInnerHTML={{ __html: innerHTML }}
    ></div>
  )
}

export default RichEditor
