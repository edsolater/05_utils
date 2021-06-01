import useScroll from 'hooks/useScroll'
import React, { ReactElement, ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { ReactProps } from 'typings/constants'
import { mergeDeepObject } from 'utils/merge'
import { BaseUIDiv, DivProps } from './Div'
import pickReactChild from './__functions/pickReactChild'

interface SideMenuController {
  collapse(): void
  expand(): void
  toggle(): void
}

interface AppLayoutProps extends DivProps {
  topbarHeightCSS?: string
  topbarCollapseWhenContentScroll?: boolean
}

interface AppLayoutTopbarProps extends DivProps {
  isHidden?: boolean
  onTapSwitcher?: (isOn: boolean) => void
  sideMenuController?: SideMenuController
  children?: ReactNode | ((isHidden: boolean, sideMenuController: SideMenuController) => ReactNode)
}

interface AppLayoutSideMenuProps extends DivProps {
  isCollapsed?: boolean
  onCollapseSelf?: () => void
  onExpandSelf?: () => void
  sideMenuController?: SideMenuController
  children?: ReactNode | ((collapse: boolean, sideMenuController: SideMenuController) => ReactNode)
}

interface AppLayoutContentProps extends DivProps {
  onScrollDown?: () => void
  onScrollUp?: () => void
  sideMenuController?: SideMenuController
  children?: ReactNode | ((sideMenuController: SideMenuController) => ReactNode)
}

/**
 * this layout may be used in App root. For example: index.tsx(Trading Page)
 */
export default function AppLayout(props: ReactProps<AppLayoutProps>) {
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
  const sideMenuController: SideMenuController = {
    collapse: collapseSideMenu,
    expand: expandSideMenu,
    toggle: toggleSideMenu
  }
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
            isHidden: isScrollingDown,
            onTapSwitcher: setIsSideMenuCollapsed,
            sideMenuController: sideMenuController
          },
          topbarElement?.props
        ])}
      />
      <AppLayoutSideMenu
        {...mergeDeepObject([
          {
            isCollapsed: isSideMenuCollapsed,
            onCollapseSelf: collapseSideMenu,
            onExpandSelf: expandSideMenu,
            sideMenuController: sideMenuController
          },
          sideMenuElement?.props
        ])}
      />
      <AppLayoutContent
        {...mergeDeepObject([
          {
            onScrollDown: setScrollingDown,
            onScrollUp: setScrollingUp,
            sideMenuController: sideMenuController
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
        ? props.children(Boolean(props.isHidden), props.sideMenuController!)
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
function AppLayoutSideMenu(props: AppLayoutSideMenuProps): ReactElement<AppLayoutSideMenuProps> {
  return (
    <BaseUIDiv
      {...props}
      _css={{ gridArea: 'b', overflow: 'auto' }}
      _className={`${AppLayoutSideMenu.name}`}
    >
      {typeof props.children === 'function'
        ? props.children(Boolean(props.isCollapsed), props.sideMenuController!)
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
    >
      {typeof props.children === 'function'
        ? props.children(props.sideMenuController!)
        : props.children}
    </BaseUIDiv>
  )
}

AppLayout.Topbar = AppLayoutTopbar
AppLayout.SideMenu = AppLayoutSideMenu
AppLayout.Content = AppLayoutContent
