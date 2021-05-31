import AppLayout from 'baseUI/AppLayout'
import Div from 'baseUI/Div'
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
                height: isHidden ? '56px' : '0',
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
          <Div css={{ height: '300vh', background: cssColor.whitesmoke }}>Content</Div>
        </AppLayout.Content>
      </AppLayout>
    </ExampleGroup>
  </ExampleCard>
)

export default AppLayoutExample
