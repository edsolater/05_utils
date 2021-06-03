import Transform from 'baseUI/component/Transform'
import React from 'react'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'
import cssColor from 'baseUI/component/__config/cssColor'
import Div from 'baseUI/component/Div'

/**
 * Transform 的使用示例
 */
const TransformExample = () => (
  <ExampleCard category='baseUI/componentComponent' title='Transform（依赖于Card）'>
    <ExampleGroup caption='基本'>
      <Transform css={{ width: '100px', height: '100px' }} scalable canInertialSlide>
        <Div css={{ width: '100%', height: '100%', background: cssColor.dodgerblue }} />{' '}
        {/* //IDEA: 能不能把css都集中在子组件? */}
      </Transform>
    </ExampleGroup>
  </ExampleCard>
)

export default TransformExample
