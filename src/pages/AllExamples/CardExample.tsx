import Card from 'baseUI/Card'
import _ViewController from 'baseUI/_ViewController'
import React from 'react'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'

/**
 * Button 的使用示例
 */
const CardExample = () => (
  <ExampleCard category='BaseUI' title='Card（Div变种）'>
    <ExampleGroup caption='卡片'>
      <_ViewController hidden>
        <Card width={200} height={300} color='#1e1c35' />
      </_ViewController>
      <Card width={200} height={300} bgImg='/images/仲裁人.jpg' />
      <Card width={200} height={300} gradient='linear-gradient(dodgerblue, skyblue)' />
      {/* 可以因为要有hover效果，更智能点 */}
    </ExampleGroup>
  </ExampleCard>
)

export default CardExample
