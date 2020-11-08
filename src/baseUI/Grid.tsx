import Div from './Div'
import React, { FC } from 'react'
import { Interpolation } from '@emotion/core'

const Grid: FC<{}> = ({}) => {
  const gridItemBasicCSS: Interpolation = {
    background: '#fff8'
  }
  return (
    <Div
      className='grid-box'
      css={{
        width: '80vw',
        height: '80vh',
        padding: 8,
        display: 'grid',
        gridAutoFlow: 'dense',
        gridTemplate: `
          'a b' 60px
          'a c' 1fr / 200px 1fr
        `,
        gap: 3,
        outline: '1px solid black',
        background: 'dodgerblue',
        overflow: 'hidden',
        resize: 'both'
      }}
    >
      <Div className='grid-item' css={[gridItemBasicCSS, { gridArea: 'a' }]} />
      <Div className='grid-item' css={[gridItemBasicCSS, { gridArea: 'b' }]} />
      <Div className='grid-item' css={[gridItemBasicCSS, { gridArea: 'c' }]} />
    </Div>
  )
}
export default Grid
