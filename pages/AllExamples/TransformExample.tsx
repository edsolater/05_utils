import Transform from 'baseUI/components/Transform'
import React from 'react'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'
import cssColor from 'baseUI/components/__config/cssColor'
import Div from 'baseUI/components/Div'

/**
 * Transform 的使用示例
 */
const TransformExample = () => (
  <ExampleCard category='baseUI/componentComponent' title='Transform（依赖于Card）'>
    <ExampleGroup caption='基本'>
      <Transform
        css={{ width: '100px', height: '100px' }}
        featureMoveOptions={{ canSlide: true }}
      >
        <Div css={{ width: '100%', height: '100%', background: cssColor.dodgerblue }} />{' '}
        {/* //IDEA: 能不能把css都集中在子组件? */}
      </Transform>
    </ExampleGroup>
  </ExampleCard>
)

export default TransformExample
