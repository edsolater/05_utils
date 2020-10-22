/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { clearArray, firstItem, lastItem, numberInRange } from 'functions/tools'
import { applyRange } from 'functions/domHelper'
import { isTextNode } from 'functions/typeGards'
import { FC, ReactElement, useEffect, useLayoutEffect, useRef, useState } from 'react'

type RangeInfo = {
  startContainer?: Node
  // 划线区的开头，相对与整段文字内容的位置
  start: number
  endContainer?: Node
  // 划线区的结尾，相对与整段文字内容的位置
  end: number
}
type OperationRecord = {
  innerHTML: string
  range: RangeInfo
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
function applyOffsetRange(editor: HTMLElement, { start, end }: RangeInfo) {
  var charIndex = 0
  const newRange = document.createRange()
  const textNodeStack = getAllTextNodesFromNode(editor)
  let foundStart = false // 记录是否已找到了选区的开始位置

  newRange.setStart(editor, 0) //设定好默认的选区开始位置
  for (let i = 0; i < textNodeStack.length; i++) {
    const textNode = textNodeStack[i]
    if (!foundStart && numberInRange(start, [charIndex, charIndex + textNode.length])) {
      newRange.setStart(textNode, start - charIndex)
      foundStart = true
    }
    if (foundStart && numberInRange(end, [charIndex, charIndex + textNode.length])) {
      newRange.setEnd(textNode, end - charIndex)
      break // 至此，选取的开始与结尾都记录完毕，不需要继续遍历了
    }
    charIndex += textNode.length
  }
  applyRange(newRange)
}

/**
 * 基于选区与文字，加粗
 */
function getBlodText(
  originalInnerHTML: string,
  { startContainer, endContainer, start, end }: RangeInfo
): string {
  //  第一步：根据文字偏移量，计算出插入位置
  const { start: insertStart, end: insertEnd } = computeOffsetRange(originalInnerHTML, start, end)

  // 第二步：设定要插入的标签
  let [startTag, endTag] = ['<b>', '</b>']
  // TODO: 应该只用 start 与 end，originalInnerHTML 就能判断的。
  if (
    startContainer &&
    endContainer &&
    startContainer === endContainer &&
    endContainer.parentElement?.tagName === 'B'
  ) {
    // 当始末都在同一节点中，且选区始末都是粗体时，加粗是将粗体变细。因此交换2者即可
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

  // 第四步： 对</b><b>这种相邻无用标签的判定
  const margedInnerHTML = rawNewInnerHTML.replace(/<\/b>\n*<b>/g, '')

  // 第五步： 去除<b>\n</b>或<b></b>, 这种空标签
  const canPaintInnerHTML = margedInnerHTML.replace(/<b>(\n*)<\/b>/g, '$1')

  // 第六步： 去除不影响显示，但无用的标签。称为拍平。因为如果有嵌套关系会影响下一次的样式应用
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
  return flatedInnerHTML.join('')
}
function getEnteredText(originalInnerHTML: string, { start, end }: RangeInfo) {
  //  第一步：根据文字偏移量，计算出插入位置
  const { start: insertStart, end: insertEnd } = computeOffsetRange(originalInnerHTML, start, end)
  // 第二步：插入
  const newInnerHTML = `${originalInnerHTML.slice(0, insertStart)}\n${originalInnerHTML.slice(
    insertEnd
  )}`
  return newInnerHTML
}

/**
 * 输入：原文及选区字符位置的偏移量，
 * 输出：选在行首/中间/行末， 是选区还是单纯的光标
 * @param innerHTML 整个文字的innerHTML
 */
function tellCursorPoint(
  innerHTML: string,
  { start, end }: RangeInfo
): [point: 'start' | 'middle' | 'end', isCollapse: boolean] {
  //  第一步：根据文字偏移量，计算出插入位置
  const { start: insertStart, end: insertEnd } = computeOffsetRange(innerHTML, start, end)
  // TODO： 感觉这个模式能提成一个函数，这么多if不够函数化
  let result: 'start' | 'middle' | 'end'
  if (insertStart === 0) {
    result = 'start'
  } else if (firstItem(innerHTML.slice(insertEnd).replace(/<.*>/g, '')) === '\n') {
    // insertEnd 以后的字符串除去标签外，并以'\n'开头
    result = 'end'
  } else if (lastItem(innerHTML.slice(0, insertStart).replace(/<.*>/g, '')) === '\n') {
    result = 'start'
  } else {
    result = 'middle'
  }
  return [result, start === end]
}

/**
 * 根据文字偏移量，计算出插入位置
 */
function computeOffsetRange(originalInnerHTML: string, start: number, end: number) {
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
  return { start: insertStart, end: insertEnd }
}
/**
 * 记录下一些range的信息
 */
function translateToRangeInfo(editor: HTMLDivElement, range: Range): RangeInfo {
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
  const editorRef = useRef(document.createElement('div'))
  // 保存上一个选取范围的信息
  const lastRangeInfo = useRef<RangeInfo>({ start: 0, end: 0 })
  // 编辑器内部的文本信息
  const [innerHTML, setInnerHTML] = useState('')
  // 更改的操作栈
  const operationStack = useRef<OperationRecord[]>([])
  // 撤销的操作栈
  const undoStack = useRef<OperationRecord[]>([])
  //#endregion

  //#region ------------------- 组件内部方法 -------------------,
  const getDOMRangeInfo = () => {
    const range = getSelection()?.getRangeAt(0)
    return editorRef.current && range
      ? translateToRangeInfo(editorRef.current, range)
      : ({ start: 0, end: 0 } as RangeInfo)
  }
  /** 记录下选区的信息 */
  const recordCurrentRangeToRef = () => {
    const info = getDOMRangeInfo()
    lastRangeInfo.current = info
  }
  const syncFromDom = () => {
    if (editorRef.current) {
      recordNewInnerHTMLAndRange(editorRef.current.innerHTML, getDOMRangeInfo())
    }
  }
  const syncFromData = (newInnerHTML: string, range?: RangeInfo) => {
    recordNewInnerHTMLAndRange(newInnerHTML, range)
  }
  /** 快照当前的编辑内容与光标位置 */
  const recordNewInnerHTMLAndRange = (newInnerHTML: string, rangeInfo?: RangeInfo) => {
    if (innerHTML !== newInnerHTML) setInnerHTML(newInnerHTML)
    recordCurrentRangeToRef()

    if (undoStack.current.length) clearArray(undoStack.current)
    operationStack.current.push({
      innerHTML: newInnerHTML,
      range: rangeInfo ?? lastRangeInfo.current // 如果没有指定，就复刻上一项的
    })
  }
  const undo = () => {
    console.log('operationStack: ', operationStack)
    console.log('undoStack: ', undoStack)
    if (operationStack.current.length > 1) {
      undoStack.current.push(operationStack.current.pop()!)
      const operation = lastItem(operationStack.current)
      setInnerHTML(operation.innerHTML)
      applyOffsetRange(editorRef.current!, operation.range) //TODO: 要提取到组件内部，省去`editorRef.current`
    }
  }
  const redo = () => {
    console.log('redo: ')
    if (undoStack.current.length) {
      const operation = undoStack.current.pop()!
      operationStack.current.push(operation)
      setInnerHTML(operation.innerHTML)
      applyOffsetRange(editorRef.current!, operation.range)
    }
  }
  const offsetRangeInfo = (offsetNumber: number) => {
    lastRangeInfo.current = {
      start: lastRangeInfo.current.start + offsetNumber,
      end: lastRangeInfo.current.end + offsetNumber
    }
  }
  const collapseRangeInfo = () => {
    lastRangeInfo.current = {
      start: lastRangeInfo.current.start,
      end: lastRangeInfo.current.start
    }
  }
  //#endregion

  //#region ------------------- effect/layoutEffect -------------------
  // 只要有更新内容，就会触发对光标选区的重新计算
  useLayoutEffect(() => {
    //TODO 想办法干掉
    if (editorRef.current && lastRangeInfo.current)
      applyOffsetRange(editorRef.current, lastRangeInfo.current)
  }, [innerHTML])
  // 改变选区的 selectionChange 事件只能挂载在 document 上
  useEffect(() => {
    const selectionChangeCallback = () => {
      recordCurrentRangeToRef()
    }
    document.addEventListener('selectionchange', selectionChangeCallback)
    return () => {
      document.removeEventListener('selectionchange', selectionChangeCallback)
    }
  }, [])
  //#endregion
  return (
    <div
      ref={editorRef}
      css={css({
        backgroundColor: '#eee',
        outline: 'none',
        whiteSpace: 'pre-wrap',
        img: {
          display: 'block',
          maxHeight: 300,
          maxWidth: 300
        }
      })}
      onFocus={() => {
        syncFromData(innerHTML + '\n') // 加上\n是因为回车换行的需求
      }}
      onBlur={() => {
        syncFromData(innerHTML.slice(0, innerHTML.length - 1)) // 把换行符去掉
      }}
      onCompositionEnd={() => {
        // TODO 与 onInput 合并地暴露成一个props
        // 输入法结束后，触发同步更新 innerHTML
        syncFromDom()
      }}
      onInput={({ nativeEvent }) => {
        //TODO 当插入图片时，指针要移到图片后
        // 不是输入法，都触发同步更新 innerHTML
        if ((nativeEvent as InputEvent).inputType !== 'insertCompositionText') {
          syncFromDom()
        }
      }}
      onKeyDown={e => {
        /**
         * 用户输入：加粗命令
         */
        if (e.ctrlKey && e.key.toLowerCase() === 'b') {
          // 阻止弹出我的收藏夹文件夹
          e.preventDefault()
          recordNewInnerHTMLAndRange(
            getBlodText(innerHTML, lastRangeInfo.current),
            getDOMRangeInfo()
          )
        }

        /**
         * 用户输入：回车命令
         */
        if (e.key === 'Enter') {
          // 阻止默认的contentEditable回车建立 <div> 的逻辑
          e.preventDefault()
          const [cursorPoint, isCollapse] = tellCursorPoint(innerHTML, lastRangeInfo.current)
          if (isCollapse && cursorPoint === 'end') offsetRangeInfo(1) // 行末回车
          const resultText = getEnteredText(innerHTML, lastRangeInfo.current)
          collapseRangeInfo()
          syncFromData(resultText)
          if (!isCollapse && cursorPoint === 'end') offsetRangeInfo(1) //行末回车
          if (cursorPoint === 'middle') offsetRangeInfo(1) // 行中回车
          if (cursorPoint === 'start') offsetRangeInfo(1) // 行首回车
        }

        /**
         * 用户输入：undo/redo
         */
        if (e.ctrlKey && e.key.toLowerCase() === 'z') {
          e.preventDefault()
          e.shiftKey ? redo() : undo()
        }
      }}
      contentEditable
      dangerouslySetInnerHTML={{ __html: innerHTML }}
    ></div>
  )
}

export default RichEditor
