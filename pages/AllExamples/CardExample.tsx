import { Card } from 'baseUI/components'
import React from 'react'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'

/**
 * Button 的使用示例
 */
const CardExample = () => (
  <ExampleCard category='baseUI/componentComponent' title='Card（Div变种）'>
    <ExampleGroup caption='卡片'>
      <Card width={200} height={300} color='#1e1c35' />
      <Card width={200} height={300} bg='url(/images/仲裁人.jpg) center/cover' />
      <Card width={200} height={300} bg='linear-gradient(dodgerblue, skyblue)' />
      {/* 可以因为要有hover效果，更智能点 */}
    </ExampleGroup>
  </ExampleCard>
)

export default CardExample
