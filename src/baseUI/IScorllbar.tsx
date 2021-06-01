import useScroll from 'hooks/useScroll'
import React, { ReactElement, ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { ReactProps } from 'typings/constants'
import { mergeDeepObject } from 'utils/merge'
import { BaseUIDiv, DivProps } from './Div'
import pickReactChild from './__functions/pickReactChild'

interface IScrollbarProps extends DivProps {
  topbarHeightCSS?: string
  topbarCollapseWhenContentScroll?: boolean
}

/**
 * @UIComponent
 * this component will get
 */
export default function IScrollbar({ children }: ReactProps<IScrollbarProps>) {
  const [isScrollingDown, setIsScrollingDown] = useState(false)
  const setScrollingDown = useCallback(() => setIsScrollingDown(true), [setIsScrollingDown])
  const setScrollingUp = useCallback(() => setIsScrollingDown(false), [setIsScrollingDown])

  // todo: following explain how important it is to create useToggle
  const [isSideMenuCollapsed, setIsSideMenuCollapsed] = useState(false)
  const collapseSideMenu = useCallback(() => setIsSideMenuCollapsed(true), [setIsSideMenuCollapsed])
  const expandSideMenu = useCallback(() => setIsSideMenuCollapsed(false), [setIsSideMenuCollapsed])
  const toggleSideMenu = useCallback(() => setIsSideMenuCollapsed((b) => !b), [
    setIsSideMenuCollapsed
  ])
  return (
    <BaseUIDiv
      _className='i-scrollbar'
      _css={{
        display:'contents',
        '> *': {
          color: 'yellow',
          '::-webkit-scrollbar': {
            display: 'none'
          }
        }
      }}
    >
      {children}
    </BaseUIDiv>
  )
}
