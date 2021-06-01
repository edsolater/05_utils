import AppLayout from 'baseUI/AppLayout'
import Div from 'baseUI/Div'
import IScrollbar from 'baseUI/IScorllbar'
import cssColor from 'baseUI/__config/cssColor'
import cssDefaults from 'baseUI/__config/cssDefaults'
import React from 'react'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'

/**
 * AppLayout 的使用示例
 */
const AppLayoutExample = () => (
  <ExampleCard title='AppLayout' category='TemplateComponent'>
    <ExampleGroup caption='basic'>
      <AppLayout topbarHeightCSS='56px'>
        <AppLayout.Topbar>
          {(isHidden) => (
            <Div
              css={{
                height: isHidden ? '0' : '56px',
                background: cssColor.dodgerblueLight,
                transition: cssDefaults.transiton.normal
              }}
            />
          )}
        </AppLayout.Topbar>

        <AppLayout.SideMenu>
          {(collapsed) => (
            <Div
              css={{
                height: '200vh',
                width: collapsed ? '50px' : '100px',
                background: cssColor.dodgerblue,
                transition: cssDefaults.transiton.normal
              }}
            >
              Menu
            </Div>
          )}
        </AppLayout.SideMenu>

        <AppLayout.Content>
          <IScrollbar>
            <Div
              className='wrapper'
              css={{
                height: '-webkit-fill-available', // TODO: this should be customized in styleParser. So that it won't break Firefox
                overflow: 'auto'
              }}
            >
              {/* 👆 scroll-bar belongs to this */}
              <Div
                className='long-content'
                css={{ height: '300vh', background: cssColor.whitesmoke }}
              >
                Content
              </Div>
            </Div>
          </IScrollbar>
        </AppLayout.Content>
      </AppLayout>
    </ExampleGroup>
  </ExampleCard>
)

export default AppLayoutExample
