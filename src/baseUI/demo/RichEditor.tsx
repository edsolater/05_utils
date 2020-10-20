/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import betweenNumberRange from 'functions/betweenNumberRange'
import { isTextNode } from 'functions/typeGards'
import { FC, ReactElement, useEffect, useLayoutEffect, useRef, useState } from 'react'

type IRangeInfo = {
  // 划线区的开头，相对与整段文字内容的位置
  start: number
  // 划线区的结尾，相对与整段文字内容的位置
  end: number
}

/**
 * 获取某个节点内部的所有文字节点
 * @param targetRootNode 目标节点
 */
function getAllTextNodesFromNode(targetRootNode: Node) {
  let resultStack = [targetRootNode]
  while (!resultStack.every(isTextNode)) {
    // TODO: 计算性能优化。下述做了很多无用判断。理论上O(n)应该是可以做到的，
    resultStack = resultStack.flatMap(node =>
      isTextNode(node) ? node : Array.from(node.childNodes)
    )
  }
  return resultStack
}

/**
 * 将记录下的range的应用到界面上（抄的，暂时还没看懂）
 */
function applyLastRange(editor: HTMLElement, { start, end }: IRangeInfo) {
  var charIndex = 0
  const newRange = document.createRange()
  const textNodeStack = getAllTextNodesFromNode(editor)
  let foundStart = false // 记录是否已找到了选区的开始位置

  newRange.setStart(editor, 0) //设定好默认的选区开始位置
  console.log('start,end: ', start, end)
  for (let i = 0; i < textNodeStack.length; i++) {
    const textNode = textNodeStack[i]
    if (!foundStart && betweenNumberRange(start, [charIndex, charIndex + textNode.length])) {
      newRange.setStart(textNode, start - charIndex)
      foundStart = true
    }
    if (foundStart && betweenNumberRange(end, [charIndex, charIndex + textNode.length])) {
      newRange.setEnd(textNode, end - charIndex)
      break // 至此，选取的开始与结尾都记录完毕，不需要继续遍历了
    }
    charIndex += textNode.length
  }
  console.log('newRange: ', newRange)

  const selection = getSelection()
  // 先记录因此导致的selectionChange事件非用户发起的
  selection?.removeAllRanges()
  selection?.addRange(newRange)
}

/**
 * 基于选区与文字，加粗
 */
function blodText(innerHTML: string, { start, end }: IRangeInfo): string {
  const newInnerHTML = `${innerHTML.slice(0, start)}<b>${innerHTML.slice(
    start,
    end
  )}</b>${innerHTML.slice(end)}`
  return newInnerHTML
}

/**
 * 记录下一些range的信息
 */
function getRangeInfo(editor: HTMLDivElement, range: Range) {
  const preSelectionRange = range.cloneRange()
  // 创建选择原选区文字左边的选区（目的是方便计算相对于所有文字的start/end）
  preSelectionRange.selectNodeContents(editor)
  preSelectionRange.setEnd(range.startContainer, range.startOffset)
  const start = preSelectionRange.toString().length
  return {
    start,
    end: start + range.toString().length
  }
}

/**
 * 富文本编辑器
 */
const RichEditor: FC<{ clildren?: ReactElement }> = () => {
  //#region ------------------- 组件的内部状态 -------------------
  // 编辑器框的应用
  const editorRef = useRef<HTMLDivElement>(null)
  // 保存上一个选取范围的信息
  const lastRangeInfo = useRef<IRangeInfo>()
  // 编辑器内部的文本信息
  const [innerHTML, setInnerHTML] = useState('这是一段没有意义的文字')
  //#endregion

  //#region ------------------- 组件内部方法 -------------------
  //同步innerHTML也会记录下选区的信息
  const recordRange = (editor: HTMLDivElement | null, range: Range | undefined) => {
    if (!editor || !range) return
    const info = getRangeInfo(editor, range)
    console.log('info: ', info)
    lastRangeInfo.current = info
  }
  const syncInnerHTML = () => {
    recordRange(editorRef.current, getSelection()?.getRangeAt(0))
    if (editorRef.current) setInnerHTML(editorRef.current.innerHTML)
  }
  //#endregion

  //#region ------------------- effect/layoutEffect -------------------
  // 只要有更新内容，就会触发对光标选区的重新计算
  useLayoutEffect(() => {
    if (editorRef.current && lastRangeInfo.current)
      applyLastRange(editorRef.current, lastRangeInfo.current)
  }, [innerHTML])
  // 改变选区的 selectionChange 事件只能挂载在 document 上
  // 无用功：有代码应用上一选区时，理论上无需再次记录选区
  useEffect(() => {
    document.addEventListener('selectionchange', () => {
      recordRange(editorRef.current, getSelection()?.getRangeAt(0))
    })
  }, [])
  //#endregion
  return (
    <div
      ref={editorRef}
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
      onKeyDown={e => {
        if (e.ctrlKey && e.key.toLowerCase() === 'b') {
          // 阻止弹出我的收藏夹文件夹
          e.preventDefault()
          if (lastRangeInfo.current) setInnerHTML(blodText(innerHTML, lastRangeInfo.current))
        }
      }}
      contentEditable
      dangerouslySetInnerHTML={{ __html: innerHTML }}
    ></div>
  )
}

export default RichEditor
