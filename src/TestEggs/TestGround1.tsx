import React from 'react'
import Avatar from '../rubbish/Avatar'
import Div from '../baseUI/Div'
import Gallery from '../rubbish/Gallery'
import Grid from '../baseUI/Grid'
import Transformable from '../baseUI/Transformable'
import Resizeable from '../baseUI/Resizeable'
import RichEditor from '../rubbish/RichEditor'
import VideoBlock from '../baseUI/Video'
// import SyncScroll from './SyncScroll'
// TODO：浮动（可自动排布）面板
function TestGround1() {
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
      <Transformable>
        <Div
          css={{
            width: '400px',
            height: '400px',
            background: 'crimson'
          }}
        />
      </Transformable>
      <Transformable>
        <Div
          css={{
            width: '400px',
            height: '400px',
            background: 'crimson'
          }}
        />
      </Transformable>
      {/* <Moveable>
        <VideoBlock />
      </Moveable> */}
      {/* <RichEditor /> */}
      {/* <SyncScroll /> */}
      {/* <Gallery data={tabInfo} /> */}
    </>
  )
}

export default TestGround1

