import useListenerScroll from '../hooks/useListenerScroll'
import useToggle from '../hooks/useToggle'
import React, { ReactElement, ReactNode, useRef } from 'react'
import { ReactProps } from 'typings/constants'
import { mergeDeepObject } from 'utils/functions/merge'
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
  const [isScrollingDown, { on: setScrollingDown, off: setScrollingUp }] = useToggle(false)

  const [
    isSideMenuCollapsed,
    { on: collapseSideMenu, off: expandSideMenu, toggle: toggleSideMenu }
  ] = useToggle(false)

  const sideMenuController: SideMenuController = {
    collapse: collapseSideMenu,
    expand: expandSideMenu,
    toggle: toggleSideMenu
  }

  const topbarElementProps = pickReactChild(props.children, AppLayoutTopbar)?.props
  const sideMenuElementProps = pickReactChild(props.children, AppLayoutSideMenu)?.props
  const contentElementProps = pickReactChild(props.children, AppLayoutContent)?.props
  return (
    <BaseUIDiv
      _className='AppLayout'
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
            onTapSwitcher: collapseSideMenu,
            sideMenuController: sideMenuController
          },
          topbarElementProps
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
          sideMenuElementProps
        ])}
      />
      <AppLayoutContent
        {...mergeDeepObject([
          {
            onScrollDown: setScrollingDown,
            onScrollUp: setScrollingUp,
            sideMenuController: sideMenuController
          },
          contentElementProps
        ])}
      />
    </BaseUIDiv>
  )
}

/**
 * Page's Navbar.
 * The Container is also a grid
 * it's A !!!!
 *
 * a a a
 * b c c
 * b c c
 */
function AppLayoutTopbar({
  isHidden,
  sideMenuController,
  children,
  ...restProps
}: AppLayoutTopbarProps): ReactElement<AppLayoutTopbarProps> {
  const domRef = useRef<HTMLDivElement>(null)
  return (
    <BaseUIDiv
      {...restProps}
      _domRef={domRef}
      _css={{ display: 'grid', gridArea: 'a' }}
      _className='AppLayoutTopbar'
    >
      {typeof children === 'function' ? children(Boolean(isHidden), sideMenuController!) : children}
    </BaseUIDiv>
  )
}

/**
 * Page's SideMenu.
 * The Container is also a grid
 *
 * it's B!!!!
 *
 * a a a
 * b c c
 * b c c
 */
function AppLayoutSideMenu({
  isCollapsed,
  onCollapseSelf,
  onExpandSelf,
  sideMenuController,
  children,
  ...restProps
}: AppLayoutSideMenuProps): ReactElement<AppLayoutSideMenuProps> {
  return (
    <BaseUIDiv
      {...restProps}
      _css={{ display: 'grid', gridArea: 'b', overflow: 'auto' }}
      _className='AppLayoutSideMenu'
    >
      {typeof children === 'function'
        ? children(Boolean(isCollapsed), sideMenuController!)
        : children}
    </BaseUIDiv>
  )
}

/**
 * The Container is also a grid
 * Page's article/content.
 *
 * it's C!!!!
 *
 * a a a
 * b c c
 * b c c
 */
function AppLayoutContent({
  onScrollDown,
  onScrollUp,
  sideMenuController,
  children,
  ...restProps
}: AppLayoutContentProps): ReactElement<AppLayoutContentProps> {
  const domRef = useRef<HTMLDivElement>(null)
  useListenerScroll(domRef, {
    onScroll: ({ scrollDirection }) =>
      scrollDirection === 'down' ? onScrollDown?.() : onScrollUp?.()
  })
  return (
    <BaseUIDiv
      as='main'
      {...restProps}
      _domRef={domRef}
      _css={{ display: 'grid', gridArea: 'c', overflow: 'auto' }}
      _className='AppLayoutContent'
    >
      {typeof children === 'function' ? children(sideMenuController!) : children}
    </BaseUIDiv>
  )
}

AppLayout.Topbar = AppLayoutTopbar
AppLayout.SideMenu = AppLayoutSideMenu
AppLayout.Content = AppLayoutContent
