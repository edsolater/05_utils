/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { FC, ReactElement } from 'react'

/**
 * 想做个富文本编辑器
 */
const RichTextEditor: FC<{ clildren?: ReactElement }> = props => {
  return (
    <div
      css={css({
        backgroundColor: 'red'
      })}
    >
      {props.children}
    </div>
  )
}

export default RichTextEditor
