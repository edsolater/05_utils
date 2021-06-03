import AppLayout from 'baseUI/component/AppLayout'
import Div from 'baseUI/component/Div'
import ScrollDiv from 'baseUI/component/ScrollDiv'
import cssColor from 'baseUI/component/__config/cssColor'
import cssDefaults from 'baseUI/component/__config/cssDefaults'
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
            <ScrollDiv>
              <Div
                css={{
                  height: '200vh',
                  width: collapsed ? '50px' : 'clamp(200px, 15vw, 300px)',
                  background: cssColor.dodgerblue,
                  transition: cssDefaults.transiton.normal
                }}
              >
                Menu
              </Div>
            </ScrollDiv>
          )}
        </AppLayout.SideMenu>

        <AppLayout.Content>
          <ScrollDiv>
            <Div
              className='a-long-content'
              css={{ height: '3000px', background: cssColor.whitesmoke }}
            >
              Content
            </Div>
          </ScrollDiv>
        </AppLayout.Content>
      </AppLayout>
    </ExampleGroup>
  </ExampleCard>
)

export default AppLayoutExample
