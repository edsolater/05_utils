import React from 'react'
import Gallery from './Gallery'
import RichEditor from './RichEditor'
// import SyncScroll from './SyncScroll'
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
      ]
    },
    {
      tabName: '为设计',
      entries: [
        { name: 'Botswana' },
        { name: 'Sri Lanka' },
        { name: 'Christmas Island' },
        { name: 'Dominica' },
        { name: 'Armenia' }
      ]
    },
    {
      tabName: '为数据',
      entries: [
        { name: 'Tajikistan' },
        { name: 'Guernsey' },
        { name: "Côte d'Ivoire" },
        { name: 'Philippines' },
        { name: 'Malawi' }
      ]
    },
    {
      tabName: '为运营',
      entries: [
        { name: 'Guinea' },
        { name: 'Congo - Brazzaville' },
        { name: 'Bulgaria' },
        { name: 'Ascension Island' },
        { name: 'Poland' }
      ]
    },
    {
      tabName: '为管理',
      entries: [
        { name: 'Canary Islands' },
        { name: 'Canary Islands' },
        { name: 'Germany' },
        { name: 'Pakistan' },
        { name: 'Kuwait' }
      ]
    }
  ]
  return (
    <>
      <RichEditor />
      {/* <SyncScroll /> */}
      <Gallery data={tabInfo} />
    </>
  )
}
export default TestGround
