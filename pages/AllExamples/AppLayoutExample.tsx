import AppLayout from 'baseUI/components/AppLayout'
import Div from 'baseUI/components/Div'
import ScrollDiv from 'baseUI/components/ScrollDiv'
import cssTheme from 'baseUI/settings/cssTheme'
import cssColor from 'baseUI/style/cssColor'
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
                transition: cssTheme.transition.normal
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
                  transition: cssTheme.transition.normal
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
