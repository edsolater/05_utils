import AppLayout from 'baseUI/AppLayout'
import Div from 'baseUI/Div'
import cssColor from 'baseUI/__config/cssColor'
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
          <Div css={{ height: '56px', background: cssColor.dodgerblueLight }} />
        </AppLayout.Topbar>

        <AppLayout.SideMenu>
          <Div css={{ height: '200vh', background: cssColor.dodgerblue }}>Menu</Div>
        </AppLayout.SideMenu>

        <AppLayout.Content>
          <Div css={{ height: '300vh', background: cssColor.whitesmoke }}>Content</Div>
        </AppLayout.Content>
      </AppLayout>
    </ExampleGroup>
  </ExampleCard>
)

export default AppLayoutExample
