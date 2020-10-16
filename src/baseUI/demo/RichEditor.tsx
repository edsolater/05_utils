/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { FC, ReactElement, useEffect, useRef, useState } from 'react'

/**
 * 想做个富文本编辑器
 */
const RichEditor: FC<{ clildren?: ReactElement }> = props => {
  const ref = useRef<HTMLDivElement>(null)
  const [innerHTML, setInnerHTML] = useState('hello woerldd')
  useEffect(() => {
    document.addEventListener('selectionchange', ev => {
      const selection = document.getSelection()
      if (selection?.type == 'Range') {
        const selectedText = selection.toString()
        const anchorParentElement = selection.anchorNode?.parentElement
        const content = (ev.target as HTMLDivElement).innerHTML
        const [positionA, positionB] = [selection.anchorOffset, selection.focusOffset]
        const from = Math.min(positionA, positionB)
        const to = Math.max(positionA, positionB)
        const targetContent = 'hello <b>world</b>'
        ;(ev.target as HTMLDivElement).innerHTML = targetContent
        setInnerHTML(targetContent)
      }
    })
  }, [])
  return (
    <div
      ref={ref}
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
        setTimeout(() => {
          setInnerHTML((target as HTMLDivElement).innerHTML)
        }, 0)
      }}
      contentEditable
      dangerouslySetInnerHTML={{ __html: innerHTML }}
    ></div>
  )
}

export default RichEditor
