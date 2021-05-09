import GlobalSettings from 'baseUI/AppSettingsProvider'
import React from 'react'
import ButtonExample from './ButtonExample'
import CardExample from './CardExample'
import DropdownExample from './DropdownExample'
import IconExample from './IconExample'
import InputExample from './InputExample'
import TagExample from './TagExample'
import TransformExample from './TransformExample'

const AllExamples = () => (
  <GlobalSettings>
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
