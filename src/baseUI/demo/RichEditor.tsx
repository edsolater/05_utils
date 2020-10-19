/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { FC, ReactElement, useLayoutEffect, useRef, useState } from 'react'

type IRangeInfo = {
  startContainer: Node
  startOffset: number
  endContainer: Node
  endOffset: number
}
/**
 * 将记录下的range的应用到界面上（抄的，暂时还没看懂）
 */
function applyLastRange(editor: HTMLElement, targetRange: IRangeInfo) {
  var charIndex = 0
  const range = document.createRange()
  range.setStart(editor, 0)
  range.collapse(true)
  let nodeStack = [editor]
  let node
  let foundStart = false
  let stop = false

  while (!stop && (node = nodeStack.pop())) {
    if (node.nodeType == 3) {
      var nextCharIndex = charIndex + node.length
      if (
        !foundStart &&
        targetRange.startOffset >= charIndex &&
        targetRange.startOffset <= nextCharIndex
      ) {
        range.setStart(node, targetRange.startOffset - charIndex)
        foundStart = true
      }
      if (
        foundStart &&
        targetRange.endOffset >= charIndex &&
        targetRange.endOffset <= nextCharIndex
      ) {
        range.setEnd(node, targetRange.endOffset - charIndex)
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
  // // 靠传过来的引用，系统是不认账的，所以不行。
  // const range2 = document.createRange()
  // range2.setStart(targetRange.startContainer, targetRange.startOffset)
  // range2.setEnd(targetRange.endContainer, targetRange.endOffset)
  // range2.collapse()
  // console.log('range2: ', range, range2)
  const selection = getSelection()
  selection?.removeAllRanges()
  selection?.addRange(range)
}
/**
 * 想做个富文本编辑器
 */
const RichEditor: FC<{ clildren?: ReactElement }> = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [innerHTML, setInnerHTML] = useState('这是一段没有意义的文字')

  const lastStateRange = useRef<IRangeInfo>()
  useLayoutEffect(() => {
    if (containerRef.current && lastStateRange.current)
      applyLastRange(containerRef.current, lastStateRange.current)
  }, [innerHTML])

  const syncInnerHTML = () => {
    /**
     * 记录下一些range的信息
     */
    const range = getSelection()?.getRangeAt(0)
    if (range) {
      lastStateRange.current = {
        startContainer: range.startContainer,
        startOffset: range.startOffset,
        endContainer: range.endContainer,
        endOffset: range.endOffset
      }
    }
    // 同步（记录） innerHTML
    if (containerRef.current) {
      setInnerHTML(containerRef.current.innerHTML)
    }
  }
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
      onCompositionEnd={() => {
        // 输入法结束后，触发同步更新 innerHTML
        syncInnerHTML()
      }}
      onInput={({ nativeEvent }) => {
        // 不是输入法，都触发同步更新 innerHTML
        if (!((nativeEvent as InputEvent).inputType == 'insertCompositionText')) {
          syncInnerHTML()
        }
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
