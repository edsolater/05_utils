import GlobalSettings from 'baseUI/GlobalSettings'
import React from 'react'
import ButtonExample from './ButtonExample'
import CardExample from './CardExample'
import DropdownExample from './DropdownExample'
import IconExample from './IconExample'
import InputExample from './InputExample'
import TagExample from './TagExample'
import TransformExample from './TransformExample'

const AllExamples = () => (
  <GlobalSettings defaultProps={{ ButtonProps: { htmlProps: { title: 'defaultProps' } } }}>
      <TransformExample />
      <ButtonExample />
      <IconExample />
      <CardExample />
      <InputExample />
      <DropdownExample />
      <TagExample />
  </GlobalSettings>
)
export default AllExamples
