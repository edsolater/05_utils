/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { FC, ReactNode } from 'react'
import Div from './Div'

// 半途而废，先搞Gallery
// 这个后期可以衍生进化为： IconText。（它有专门的语义性）
const ItemChip: FC<{ renderPrefix: () => ReactNode; renderSuffix: () => ReactNode }> = ({}) => {
  return (
    <Div
      css={css({
        'margin': 8,
        'padding': 8,
        'display': 'grid',
        'grid-auto-flow': 'column'
      })}
    >
      吼吼吼
    </Div>
  )
}
export default ItemChip
