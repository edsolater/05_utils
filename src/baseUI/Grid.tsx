import Div from './__Div'
import React, { FC } from 'react'
import { CSSObject } from '@emotion/react'
import parallelIf from 'utils/magic/parallelIf'

type GridType =
  | 'in-col' //全纵向排列
  | 'in-row' //横向排列
  | '2d-4-equal-slot' // 田字格
  | '2d-user-profile' // 经典图片在左，文字在右的布局
  | '2d-nav-space-content-space' // 经典APP布局：导航条在上，内容在正中，两边有留白
  | '2d-nav-menu-content' // 经典APP布局：导航条在上，菜单在左，内容在右
  | '1d-icon-text-icon' // 横向3格布局
  | '1d-article-toc' // 横向2格布局，文章占大部分，toc占小部分
  | '1d-icon-text' // 横向2格布局（icon在前）
  | 'id-text-icon' // 横向2格布局（文字在前）

const gridTemplates: {
  [K in GridType]: CSSObject
} = {
  'in-col': {
    gridAutoFlow: 'row dense'
  },
  'in-row': {
    gridAutoFlow: 'column dense'
  },
  '2d-4-equal-slot': {
    gridTemplate: `
      'a b' 1fr
      'c d' 1fr / 1fr 1fr
    `,
    '> :nth-child(n+5)': {
      display: 'none'
    }
  },
  '2d-nav-space-content-space': {
    gridTemplate: `
      'nav    nav    nav' auto
      '  .  article  .  ' 1fr / 1fr clamp(400px, 60%, 1000px) 1fr
    `,
    '> :nth-child(1)': {
      gridArea: 'nav'
    },
    '> :nth-child(2)': {
      gridArea: 'article',
      height: '300vh'
    },
    '> :nth-child(n+3)': {
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
  '2d-nav-menu-content': {
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
  '1d-icon-text-icon': {
    gridTemplate: `
      'iconA text iconB' / auto 1fr auto
    `,
    '> :nth-child(n+4)': {
      display: 'none'
    }
  },
  '1d-article-toc': {
    gridTemplate: `
      'article toc' / 1fr min(40%, 400px)
    `,
    '> :nth-child(n+3)': {
      display: 'none'
    }
  },
  '1d-icon-text': {
    gridTemplate: `
      'icon text' / auto 1fr
    `,
    '> :nth-child(n+3)': {
      display: 'none'
    }
  },
  'id-text-icon': {
    gridTemplate: `
      'text icon' / 1fr auto
    `,
    '> :nth-child(n+3)': {
      display: 'none'
    }
  }
}
const Grid: FC<{
  /**
   * grid的预定义样式
   */
  type?: GridType
  noCssGap?: boolean
  cssGap?: CSSObject['gap']
  cssBlocks?: CSSObject
}> = ({ type, noCssGap, cssGap = 8, cssBlocks, children }) => {
  return (
    <Div
      className='grid-box'
      css={[
        {
          maxWidth: '100vw', //TEMP 为了方便测试，正式使用应该去除
          height: '80vh', //TEMP 为了方便测试，正式使用应该去除
          overflow: 'auto',
          padding: 8 //TEMP 为了方便测试，正式使用应该去除
        },
        {
          display: 'grid',
          gap: noCssGap ? 0 : cssGap
        },
        { background: 'dodgerblue' },
        parallelIf(
          [type === 'in-col', gridTemplates['in-col']],
          [type === 'in-row', gridTemplates['in-row']],
          [type === '2d-4-equal-slot', gridTemplates['2d-4-equal-slot']],
          [type === '2d-user-profile', gridTemplates['2d-user-profile']],
          [type === '2d-nav-space-content-space', gridTemplates['2d-nav-space-content-space']],
          [type === '2d-nav-menu-content', gridTemplates['2d-nav-menu-content']],
          [type === '1d-icon-text-icon', gridTemplates['1d-icon-text-icon']],
          [type === '1d-article-toc', gridTemplates['1d-article-toc']],
          [type === '1d-icon-text', gridTemplates['1d-icon-text']],
          [type === 'id-text-icon', gridTemplates['id-text-icon']]
        ),
        cssBlocks
      ]}
    >
      {children}
    </Div>
  )
}
export default Grid
