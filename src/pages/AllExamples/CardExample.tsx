import Caption from 'baseUI/Caption'
import Card from 'baseUI/Card'
import RowBox from 'baseUI/RowBox'
import React from 'react'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'

/**
 * Button 的使用示例
 */
const CardExample = () => (
  <ExampleCard>
    <ExampleGroup>
      <Caption>卡片</Caption>
      <RowBox noStratch>
        <Card width={200} height={300} color='#1e1c35' />
        <Card width={200} height={300} bgImg='/images/仲裁人.jpg' />
        <Card width={200} height={300} gradient="linear-gradient(dodgerblue, skyblue)" />{/* 可以因为要有hover效果，更智能点 */}
      </RowBox>
    </ExampleGroup>
  </ExampleCard>
)

export default CardExample
