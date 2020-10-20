/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import betweenNumberRange from 'functions/betweenNumberRange'
import { assertTextNode } from 'functions/typeGards'
import { FC, ReactElement, useLayoutEffect, useRef, useState } from 'react'

type IRangeInfo = {
  // 划线区的开头，相对与整段文字内容的位置
  start: number
  // 划线区的结尾，相对与整段文字内容的位置
  end: number
}
/**
 * 将记录下的range的应用到界面上（抄的，暂时还没看懂）
 */
function applyLastRange(editor: HTMLElement, { start, end }: IRangeInfo) {
  var charIndex = 0
  const newRange = document.createRange()
  newRange.setStart(editor, 0)
  newRange.collapse(true)
  const nodeStack: Node[] = [editor]
  let foundStart = false // 记录是否已找到了选区的开始处

  while (nodeStack.length) {
    const node = nodeStack.pop()!
    if (assertTextNode(node)) {
      if (!foundStart && betweenNumberRange(start, [charIndex, charIndex + node.length])) {
        newRange.setStart(node, start - charIndex)
        foundStart = true
      }
      if (foundStart && betweenNumberRange(end, [charIndex, charIndex + node.length])) {
        newRange.setEnd(node, end - charIndex)
        // 至此，选取的开始与结尾都记录完毕，不需要继续遍历了
        break
      }
      charIndex += node.length
    } else {
      nodeStack.push(...Array.from(node.childNodes))
    }
  }
  const selection = getSelection()
  selection?.removeAllRanges()
  selection?.addRange(newRange)
}
/**
 * 想做个富文本编辑器
 */
const RichEditor: FC<{ clildren?: ReactElement }> = () => {
  // 编辑器框的应用
  const containerRef = useRef<HTMLDivElement>(null)
  // 保存上一个选取范围的信息
  const lastRangeInfo = useRef<IRangeInfo>()
  // 编辑器内部的文本信息
  const [innerHTML, setInnerHTML] = useState('这是一段没有意义的文字')
  useLayoutEffect(() => {
    if (containerRef.current && lastRangeInfo.current)
      applyLastRange(containerRef.current, lastRangeInfo.current)
  }, [innerHTML])

  const syncInnerHTML = () => {
    /**
     * 记录下一些range的信息
     */
    const range = getSelection()?.getRangeAt(0)
    if (range && containerRef.current) {
      // 创建选择原选区文字左边的选区（目的是方便计算相对于所有文字的start/end）
      const preSelectionRange = range.cloneRange()
      preSelectionRange.selectNodeContents(containerRef.current)
      preSelectionRange.setEnd(range.startContainer, range.startOffset)
      const start = preSelectionRange.toString().length

      lastRangeInfo.current = {
        start,
        end: start + range.toString().length
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
        // TODO 与 onInput 合并地暴露成一个props
        // 输入法结束后，触发同步更新 innerHTML
        syncInnerHTML()
      }}
      onInput={({ nativeEvent }) => {
        //TODO 当插入图片时，指针要移到图片后
        // 不是输入法，都触发同步更新 innerHTML
        if ((nativeEvent as InputEvent).inputType !== 'insertCompositionText') {
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
