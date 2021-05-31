import useScroll from 'hooks/useScroll'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { toPx } from 'style/cssUnits'
import { ReactProps, StateSetter } from 'typings/constants'
import { BaseUIDiv, DivProps } from './Div'
import cssDefaults from './__config/cssDefaults'
import getChildElement from './__functions/getChildElement'

interface AppLayoutProps extends DivProps {
  topbarHeightCSS?: string
  topbarCollapseWhenContentScroll?: boolean
}

/**
 * this layout may be used in App root. For example: index.tsx(Trading Page)
 */
export default function AppLayout(props: ReactProps<AppLayoutProps>) {
  const [isScrollingDown, setIsScrollingDown] = useState(false)
  const topbarElement = getChildElement(props.children, AppLayoutTopbar)
  const sideMenuElement = getChildElement(props.children, AppLayoutSideMenu)
  const contentElement = getChildElement(props.children, AppLayoutContent)
  return (
    <BaseUIDiv
      _className='app-layout-container'
      _css={{
        resize: 'both',
        width: '100%',
        height: '1000px',
        position: 'relative',
        overflow: 'hidden',
        display: 'grid',
        gridTemplate: `
          "a a a" auto
          "b c c" 1fr
          "b c c" 1fr / 1fr 1fr 1fr`
      }}
    >
      <AppLayoutTopbar hide={isScrollingDown} {...topbarElement?.props} />
      <AppLayoutSideMenu {...sideMenuElement?.props} />
      <AppLayoutContent setIsScrollingDown={setIsScrollingDown} {...contentElement?.props} />
    </BaseUIDiv>
  )
}

function AppLayoutTopbar<T extends ReactProps & DivProps & { hide?: boolean }>(
  props: T
): ReactElement<T> {
  const domRef = useRef<HTMLDivElement>(null)
  const [blockHeight, setBlockHeight] = useState(0)
  useEffect(() => {
    //TODO: this will only invoked once. Should use ResizeObserver instead
    setBlockHeight(domRef.current?.scrollHeight ?? 0)
  }, [])
  return (
    <BaseUIDiv
      {...props}
      _domRef={domRef}
      _css={{
        gridArea: 'a',
        height: props.hide ? '0' : toPx(blockHeight),
        overflow: 'hidden',
        transition: cssDefaults.transiton.normal
      }}
      _className={`${AppLayoutTopbar.name}`}
    />
  )
}

function AppLayoutSideMenu<T extends ReactProps & DivProps>(props: T): ReactElement<T> {
  return (
    <BaseUIDiv
      {...props}
      _css={{ gridArea: 'b', overflow: 'auto' }}
      _className={`${AppLayoutSideMenu.name}`}
    />
  )
}

function AppLayoutContent<
  T extends ReactProps & DivProps & { setIsScrollingDown?: StateSetter<boolean> }
>(props: T): ReactElement<T> {
  const domRef = useRef<HTMLDivElement>(null)
  useScroll(domRef, {
    onScrollDown: () => props.setIsScrollingDown?.(true),
    onScrollUp: () => props.setIsScrollingDown?.(false)
  })
  return (
    <BaseUIDiv
      {...props}
      _domRef={domRef}
      _css={{ gridArea: 'c', overflow: 'auto' }}
      as='main'
      _className={`${AppLayoutContent.name}`}
    />
  )
}

AppLayout.Topbar = AppLayoutTopbar
AppLayout.SideMenu = AppLayoutSideMenu
AppLayout.Content = AppLayoutContent
