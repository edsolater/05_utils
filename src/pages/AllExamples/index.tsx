import GlobalSettings from 'baseUI/AppSettingsProvider'
import React from 'react'
import AppProvidersExample from './AppProvidersExample'
import ButtonExample from './ButtonExample'
import CardExample from './CardExample'
import DivExample from './DivExample'
import DropdownExample from './DropdownExample'
import GlobalStoreExample from './GlobalStoreExample'
import IconExample from './IconExample'
import InputExample from './InputExample'
import TagExample from './TagExample'
import TransformExample from './TransformExample'

const AllExamples = () => (
  <GlobalSettings>
    <AppProvidersExample />
    <GlobalStoreExample />
    <DivExample />
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
