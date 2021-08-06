import React from 'react'
import { AppSettingsProvider as GlobalSettings } from 'baseUI/components/AppSettings'
import AppLayoutExample from './AppLayoutExample'
import AppProvidersExample from './AppProvidersExample'
import ButtonExample from './ButtonExample'
import CardExample from './CardExample'
import DivExample from './DivExample'
import DrawerExample from './DrawerExample'
import DropdownExample from './DropdownExample'
import GlobalStoreExample from './GlobalStoreExample'
import HoverableExample from './HoverableExample'
import IconExample from './IconExample'
import InputExample from './InputExample'
import KeyboardShortcutExample from './KeyboardShortcutExample'
import MaskExample from './MaskExample'
import NotificationExample from './NotificationExample'
import TagExample from './TagExample'
import TransformExample from './TransformExample'
import AnimateExample from './AnimateExample'
import ClickableExample from './ClickableExample'
import add from 'fnkit'

const AllExamples = () => (
  <GlobalSettings>
    <ClickableExample />
    <HoverableExample />
    <AnimateExample />
    {/* <NotificationExample />
    <AppLayoutExample />
    <KeyboardShortcutExample />
    <DrawerExample />
    <MaskExample />
    <AppProvidersExample />
    <GlobalStoreExample />
    <DivExample />
    <TransformExample />
    <ButtonExample />
    <CardExample />
    <InputExample />
    <DropdownExample />
    <TagExample />
    <IconExample /> */}
  </GlobalSettings>
)
export default AllExamples

