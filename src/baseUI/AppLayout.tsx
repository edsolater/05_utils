import useScroll from 'hooks/useScroll'
import React, { ReactElement, ReactNode, useEffect, useRef, useState } from 'react'
import { ReactProps } from 'typings/constants'
import { mergeDeepObject } from 'utils/merge'
import { BaseUIDiv, DivProps } from './Div'
import pickReactChild from './__functions/pickReactChild'

interface AppLayoutProps extends DivProps {
  topbarHeightCSS?: string
  topbarCollapseWhenContentScroll?: boolean
}

/**
 * this layout may be used in App root. For example: index.tsx(Trading Page)
 */
export default function AppLayout(props: ReactProps<AppLayoutProps>) {
  const [isScrollingUp, setIsScrollingUp] = useState(true)
  const [isSideMenuCollapsed, setIsSideMenuCollapsed] = useState(false)
  const topbarElement = pickReactChild(props.children, AppLayoutTopbar)
  const sideMenuElement = pickReactChild(props.children, AppLayoutSideMenu)
  const contentElement = pickReactChild(props.children, AppLayoutContent)
  return (
    <BaseUIDiv
      _className='app-layout-container'
      _css={{
        resize: 'both',
        width: '100%',
        height: '500px',
        position: 'relative',
        overflow: 'hidden',
        display: 'grid',
        gridTemplate: `
          "a a a" auto
          "b c c" 1fr
          "b c c" 1fr / auto 1fr 1fr`
      }}
    >
      <AppLayoutTopbar
        {...mergeDeepObject([
          {
            isHidden: isScrollingUp,
            onTapSwitcher: setIsSideMenuCollapsed
          },
          topbarElement?.props
        ])}
      />
      <AppLayoutSideMenu
        {...mergeDeepObject([
          {
            isCollapsed: isSideMenuCollapsed,
            onCollapseSelf: () => setIsSideMenuCollapsed(true),
            onExpandSelf: () => setIsSideMenuCollapsed(false)
          },
          sideMenuElement?.props
        ])}
      />
      <AppLayoutContent
        {...mergeDeepObject([
          {
            onScrollDown: () => setIsScrollingUp(false),
            onScrollUp: () => setIsScrollingUp(true)
          },
          contentElement?.props
        ])}
      />
    </BaseUIDiv>
  )
}

/**
 *
 * Page's navbar
 * it's A !!!!
 *
 * a a a
 * b c c
 * b c c
 */
interface AppLayoutTopbarProps extends DivProps {
  isHidden?: boolean
  onTapSwitcher?: (isOn: boolean) => void
  children?: ReactNode | ((isHidden: boolean) => ReactNode)
}
function AppLayoutTopbar(props: AppLayoutTopbarProps): ReactElement<AppLayoutTopbarProps> {
  const domRef = useRef<HTMLDivElement>(null)
  const [hasTurnOn, setHasTurnOn] = useState(false)
  useEffect(() => {
    props.onTapSwitcher?.(hasTurnOn)
  }, [hasTurnOn])
  return (
    <BaseUIDiv
      {...props}
      _domRef={domRef}
      _css={{ gridArea: 'a' }}
      _className={`${AppLayoutTopbar.name}`}
      onClick={() => {
        setHasTurnOn((b) => !b)
      }} //TEMP
    >
      {typeof props.children === 'function'
        ? props.children(Boolean(props.isHidden))
        : props.children}
    </BaseUIDiv>
  )
}

/**
 *
 * Page's SideMenu
 * 
 * it's B!!!!
 *
 * a a a
 * b c c
 * b c c
 */
interface AppLayoutSideMenuProps extends DivProps {
  isCollapsed?: boolean
  onCollapseSelf?: () => void
  onExpandSelf?: () => void
  children?: ReactNode | ((collapse: boolean) => ReactNode)
}
function AppLayoutSideMenu(props: AppLayoutSideMenuProps): ReactElement<AppLayoutSideMenuProps> {
  return (
    <BaseUIDiv
      {...props}
      _css={{ gridArea: 'b', overflow: 'auto' }}
      _className={`${AppLayoutSideMenu.name}`}
    >
      {typeof props.children === 'function'
        ? props.children(Boolean(props.isCollapsed))
        : props.children}
    </BaseUIDiv>
  )
}

/**
 *
 * Page's article/content
 *
 * it's C!!!!
 *
 * a a a
 * b c c
 * b c c
 */
interface AppLayoutContentProps extends ReactProps, DivProps {
  onScrollDown?: () => void
  onScrollUp?: () => void
}
function AppLayoutContent(props: AppLayoutContentProps): ReactElement<AppLayoutContentProps> {
  const domRef = useRef<HTMLDivElement>(null)
  useScroll(domRef, {
    onScrollDown: props.onScrollDown,
    onScrollUp: props.onScrollUp
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
