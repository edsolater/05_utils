/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { FC, ReactElement } from 'react'

/**
 * 想做个富文本编辑器
 */
const RichEditor: FC<{ clildren?: ReactElement }> = props => {
  return (
    <div
      css={css({
        backgroundColor: '#eee'
      })}
      contentEditable
    >
      请输入：
    </div>
  )
}

export default RichEditor
