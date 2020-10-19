/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { FC, ReactElement, useLayoutEffect, useRef, useState } from 'react'

/**
 * 将记录下的range的应用到界面上（抄的，暂时还没看懂）
 */
function applyLastRange(editor: HTMLElement, targetRange?: { start: number; end: number }) {
  var charIndex = 0
  const range = document.createRange()
  range.setStart(editor, 0)
  range.collapse(true)
  let nodeStack = [editor]
  let node
  let foundStart = false
  let stop = false

  while (!stop && (node = nodeStack.pop())) {
    if (node.nodeType == 3 && targetRange) {
      var nextCharIndex = charIndex + node.length
      if (!foundStart && targetRange.start >= charIndex && targetRange.start <= nextCharIndex) {
        range.setStart(node, targetRange.start - charIndex)
        foundStart = true
      }
      if (foundStart && targetRange.end >= charIndex && targetRange.end <= nextCharIndex) {
        range.setEnd(node, targetRange.end - charIndex)
        stop = true
      }
      charIndex = nextCharIndex
    } else {
      var i = node.childNodes.length
      while (i--) {
        nodeStack.push(node.childNodes[i])
      }
    }
  }
  const selection = getSelection()
  selection?.removeAllRanges()
  selection?.addRange(range)
}
/**
 * 想做个富文本编辑器
 */
const RichEditor: FC<{ clildren?: ReactElement }> = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [innerHTML, setInnerHTML] = useState('hello world')
  const lastStateRange = useRef<{ start: number; end: number }>()
  useLayoutEffect(() => {
    if (containerRef.current) applyLastRange(containerRef.current, lastStateRange.current)
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
        /**
         * 记录下一些range的数据（抄的，暂时还没看懂）
         */
        const range = getSelection()?.getRangeAt(0)
        if (range) {
          const preSelectionRange = range.cloneRange()
          preSelectionRange.selectNodeContents(range.commonAncestorContainer)
          preSelectionRange.setEnd(range.startContainer, range.startOffset)
          const start = preSelectionRange.toString().length

          lastStateRange.current = {
            start,
            end: start + range.toString().length
          }
        }

        setInnerHTML((target as HTMLDivElement).innerHTML)
      }}
      // onKeyDown={e => {
      //   if (e.ctrlKey && e.key.toLowerCase() === 'b') {
      //     // 阻止弹出我的收藏夹文件夹
      //     e.preventDefault()

      //     const selection = getSelection()
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
