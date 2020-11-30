import React from 'react'
import Avatar from './Avatar'
import Div from './Div'
import Gallery from './Gallery'
import Grid from './Grid'
import Moveable from './Moveable'
import Resizeable from './Resizeable'
import RichEditor from './RichEditor'
import VideoBlock from './VideoBlock'
// import SyncScroll from './SyncScroll'
// TODO：浮动（可自动排布）面板
function TestGround() {
  const tabInfo = [
    {
      tabName: '为开发',
      entries: [
        { name: 'Aruba' },
        { name: 'Bermuda' },
        { name: 'Portugal' },
        { name: 'Iceland' },
        { name: 'Brunei' },
        { name: 'Cook Islands' },
        { name: 'Zambia' },
        { name: 'Indonesia' },
        { name: 'Aruba' },
        { name: 'Bermuda' },
        { name: 'Portugal' },
        { name: 'Iceland' },
        { name: 'Brunei' },
        { name: 'Cook Islands' },
        { name: 'Zambia' },
        { name: 'Indonesia' },
      ],
    },
    {
      tabName: '为设计',
      entries: [
        { name: 'Botswana' },
        { name: 'Sri Lanka' },
        { name: 'Christmas Island' },
        { name: 'Dominica' },
        { name: 'Armenia' },
      ],
    },
    {
      tabName: '为数据',
      entries: [
        { name: 'Tajikistan' },
        { name: 'Guernsey' },
        { name: "Côte d'Ivoire" },
        { name: 'Philippines' },
        { name: 'Malawi' },
      ],
    },
    {
      tabName: '为运营',
      entries: [
        { name: 'Guinea' },
        { name: 'Congo - Brazzaville' },
        { name: 'Bulgaria' },
        { name: 'Ascension Island' },
        { name: 'Poland' },
      ],
    },
    {
      tabName: '为管理',
      entries: [
        { name: 'Canary Islands' },
        { name: 'Canary Islands' },
        { name: 'Germany' },
        { name: 'Pakistan' },
        { name: 'Kuwait' },
      ],
    },
  ]
  return (
    <>
      {/* <Avatar /> */}
      {/* <Grid type='1d-article-toc'>
        <Div
          className='grid-item'
          css={{
            background: '#fff8'
          }}
        >
          A
        </Div>
        <Div className='grid-item' css={{ background: '#fff8' }}>
          B
        </Div>
        <Div className='grid-item' css={{ background: '#fff8' }}>
          C
        </Div>
        <Div className='grid-item' css={{ background: '#fff8' }}>
          D
        </Div>
      </Grid> */}
      {/* <Resizeable>
        <Div
          css={{
            width: '100%',
            height: '100%',
            background: 'crimson'
          }}
        />
      </Resizeable> */}
      <Moveable>
        <VideoBlock />
      </Moveable>
      <Moveable>
        <VideoBlock />
      </Moveable>
      {/* <RichEditor /> */}
      {/* <SyncScroll /> */}
      {/* <Gallery data={tabInfo} /> */}
    </>
  )
}

export default TestGround
