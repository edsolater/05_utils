import Div from './Div'
import React, { FC } from 'react'
import { CSSObject, Interpolation } from '@emotion/core'
import chainIf from 'functions/chainIf'

type GridType =
  | 'verticle' //全纵向排列
  | 'horizontal' //横向排列
  | '2d-4-slot' // 田字格
  | '2d-user-profile' // 经典图片在左，文字在右的布局
  | '2d-app-menu-nav-content' // 经典APP布局：导航条在上，菜单在左，内容在右
  | '1d-row-3-slot' // 横向3格布局
  | '1d-row-2-slot-solid-prefix' // 横向2格布局(前缀是icon}
  | '1d-row-2-slot-solid-suffix' // 横向2格布局(后缀是icon}

const gridTemplates: {
  [K in GridType]: Interpolation
} = {
  verticle: {
    gridAutoFlow: 'row dense'
  },
  horizontal: {
    gridAutoFlow: 'column dense'
  },
  '2d-4-slot': {
    gridTemplate: `
      'a b' 1fr
      'c d' 1fr / 1fr 1fr
    `,
    '> :nth-child(n+5)': {
      display: 'none'
    }
  },
  '2d-user-profile': {
    gridTemplate: `
      'a b' 1fr
      'a c' 1fr / auto 1fr
    `,
    '> :nth-child(1)': {
      gridArea: 'a'
    },
    '> :nth-child(n+4)': {
      display: 'none'
    }
  },
  '2d-app-menu-nav-content': {
    gridTemplate: `
      'menu  nav' auto
      'menu  cnt' 1fr / auto 1fr
    `,
    '> :nth-child(1)': {
      gridArea: 'menu'
    },
    '> :nth-child(n+4)': {
      display: 'none'
    }
  },
  '1d-row-3-slot': {
    gridTemplate: `
      'a b c' / auto 1fr auto
    `,
    '> :nth-child(n+4)': {
      display: 'none'
    }
  },
  '1d-row-2-slot-solid-prefix': {
    gridTemplate: `
      'a b' / auto 1fr
    `,
    '> :nth-child(n+3)': {
      display: 'none'
    }
  },
  '1d-row-2-slot-solid-suffix': {
    gridTemplate: `
      'a b' / 1fr auto
    `,
    '> :nth-child(n+3)': {
      display: 'none'
    }
  }
}
const gridItemBasicCSS: Interpolation = {
  background: '#fff8',
}

const Grid: FC<{
  /**
   * grid的预定义样式
   */
  type?: GridType
  noCssGap?: boolean
  cssGap?: CSSObject['gap']
  cssBlocks?: Interpolation
}> = ({ type, noCssGap, cssGap = 8, cssBlocks }) => {
  return (
    <Div
      className='grid-box'
      css={[
        {
          maxWidth: '100vw',
          height: '80vh',
          padding: 8
        },
        {
          display: 'grid',
          gap: noCssGap ? 0 : cssGap
        },
        { background: 'dodgerblue' },
        chainIf(
          [type === 'verticle', gridTemplates.verticle],
          [type === 'horizontal', gridTemplates.horizontal],
          [type === '2d-4-slot', gridTemplates['2d-4-slot']],
          [type === '2d-user-profile', gridTemplates['2d-user-profile']],
          [type === '2d-app-menu-nav-content', gridTemplates['2d-app-menu-nav-content']],
          [type === '1d-row-3-slot', gridTemplates['1d-row-3-slot']],
          [type === '1d-row-2-slot-solid-prefix', gridTemplates['1d-row-2-slot-solid-prefix']],
          [type === '1d-row-2-slot-solid-suffix', gridTemplates['1d-row-2-slot-solid-suffix']]
        ),
        cssBlocks
      ]}
    >
      <Div className='grid-item' css={[gridItemBasicCSS]}>
        A
      </Div>
      <Div className='grid-item' css={[gridItemBasicCSS]}>
        B
      </Div>
      <Div className='grid-item' css={[gridItemBasicCSS]}>
        C
      </Div>
      <Div className='grid-item' css={[gridItemBasicCSS]}>
        D
      </Div>
    </Div>
  )
}
export default Grid
