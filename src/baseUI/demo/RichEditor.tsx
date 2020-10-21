/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import betweenNumberRange from 'functions/betweenNumberRange'
import { isTextNode } from 'functions/typeGards'
import { FC, ReactElement, useEffect, useLayoutEffect, useRef, useState } from 'react'

type RangeInfo = {
  startContainer: Node
  // 划线区的开头，相对与整段文字内容的位置
  start: number
  endContainer: Node
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
 * 将记录下的range的应用到界面上（不完全是自己想的）
 */
function applyLastRange(editor: HTMLElement, { start, end }: RangeInfo) {
  var charIndex = 0
  const newRange = document.createRange()
  const textNodeStack = getAllTextNodesFromNode(editor)
  let foundStart = false // 记录是否已找到了选区的开始位置

  newRange.setStart(editor, 0) //设定好默认的选区开始位置
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

  const selection = getSelection()
  selection?.removeAllRanges()
  selection?.addRange(newRange)
}

/**
 * 基于选区与文字，加粗
 */
function getBlodText(
  originalInnerHTML: string,
  { startContainer, endContainer, start, end }: RangeInfo
): string {
  //  第一步：根据文字偏移量，计算出插入位置
  const angleBracketStack: Array<'<'> = []
  function isNormalText(char: string) {
    return char !== '<' && char !== '>' && angleBracketStack.length === 0
  }
  let leftTextCount = 0
  let insertStart = 0
  let insertEnd = 0
  for (let i = 0; i < originalInnerHTML.length; i++) {
    const char = originalInnerHTML[i]
    if (char === '<') {
      angleBracketStack.push('<')
    } else if (char === '>') {
      angleBracketStack.pop()
    } else if (isNormalText(char)) {
      leftTextCount += 1
      if (leftTextCount === start) insertStart = i + 1
      if (leftTextCount === end) {
        insertEnd = i + 1
        break
      }
    }
  }

  // 第二步：设定要插入的标签
  let [startTag, endTag] = ['<b>', '</b>']
  if (startContainer === endContainer && endContainer.parentElement?.tagName === 'B') {
    console.log(4) // 当始末都在同一节点中，且选区始末都是粗体时（此时加粗是将粗体变细
    const temp = endTag
    endTag = startTag
    startTag = temp
  }
  // 第三步：插入
  const rawNewInnerHTML = `${originalInnerHTML.slice(
    0,
    insertStart
  )}${startTag}${originalInnerHTML.slice(insertStart, insertEnd)}${endTag}${originalInnerHTML.slice(
    insertEnd
  )}`

  // 第四步： 重叠判定（针对对已加粗文本再加粗，）
  const canPaintInnerHTML = rawNewInnerHTML.replace(/<\/?b><\/?b>/g, '')

  // 第五步： 去除不影响显示，但无用的标签。称为拍平。因为如果有嵌套关系会影响下一次的样式应用
  function isTag(text: string) {
    return /^<.*/.test(text)
  }
  function isEndTag(text: string) {
    return /^<\/.*/.test(text)
  }
  function isBeginTag(text: string) {
    return isTag(text) && !isEndTag(text)
  }
  let flatedInnerHTML: string[] = []
  const splitedCanPaintInnerHTML = canPaintInnerHTML.replace(/(<.*?>)/g, '/0$1/0').split('/0') //[ "这是", "<b>", "一段没", "</b>", "有", "<b>", "意义的文", "</b>", "字" ]
  const tagStack: Array<string> = []
  for (let i = 0; i < splitedCanPaintInnerHTML.length; i++) {
    const textPiece = splitedCanPaintInnerHTML[i]
    if (isTag(textPiece)) {
      if (isBeginTag(textPiece)) {
        tagStack.push(textPiece)
        if (tagStack.length > 1) continue
      } else if (isEndTag(textPiece)) {
        tagStack.pop()
        if (tagStack.length > 0) continue
      }
    }
    flatedInnerHTML.push(textPiece)
  }

  // console.log(
  //   'splitedCanPaintInnerHTML: ',
  //   splitedCanPaintInnerHTML,
  //   splitedCanPaintInnerHTML.join('')
  // )
  // console.log('flatedInnerHTML: ', flatedInnerHTML, flatedInnerHTML.join(''))
  return flatedInnerHTML.join('')
}

/**
 * 记录下一些range的信息
 */
function getRangeInfo(editor: HTMLDivElement, range: Range): RangeInfo {
  const preSelectionRange = range.cloneRange()
  // 创建选择原选区文字左边的选区（目的是方便计算相对于文档的偏移量）
  preSelectionRange.selectNodeContents(editor)
  preSelectionRange.setEnd(range.startContainer, range.startOffset)
  const start = preSelectionRange.toString().length
  return {
    startContainer: range.startContainer,
    endContainer: range.endContainer,
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
  const lastRangeInfo = useRef<RangeInfo>()
  // 编辑器内部的文本信息
  const [innerHTML, setInnerHTML] = useState('这是<b>一段没</b>有意义<b>的文</b>字')
  //#endregion

  //#region ------------------- 组件内部方法 -------------------,
  //同步innerHTML也会记录下选区的信息
  const recordRange = (editor: HTMLDivElement | null, range: Range | undefined) => {
    if (!editor || !range) return
    const info = getRangeInfo(editor, range)
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
          if (lastRangeInfo.current) setInnerHTML(getBlodText(innerHTML, lastRangeInfo.current))
        }
      }}
      contentEditable
      dangerouslySetInnerHTML={{ __html: innerHTML }}
    ></div>
  )
}

export default RichEditor
