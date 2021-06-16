import { addDefaultProps, mergeProps } from 'baseUI/functions'
import React, { createContext, FC, ReactNode, useContext } from 'react'
import { overwriteFunctionName } from 'utils/functions/functionFactory'
import { ButtonSprops } from './Button'
import { CaptionSprops } from './Caption'
import { CardProps } from './Card'
import { DropdownSprops } from './Dropdown'
import { IconSprops } from './Icon'
import { ImageSprops } from './Image'
import { InputSprops } from './Input'
import { MaskSprops } from './Mask'
import { NotificationSprops } from './Notification'
import { RowSprops } from './Row'
import { TagSprops } from './Tag'
import { TransitionSprops } from './Transition'

export interface AppSetting {
  /**
   * baseUI的css的具体值（可能不包含在props中， 是CSS的尺寸细节）
   */
  globalProps?: {
    Button?: ButtonSprops
    Caption?: CaptionSprops
    Card?: CardProps
    Icon?: IconSprops
    Image?: ImageSprops
    Input?: InputSprops
    Row?: RowSprops
    Dropdown?: DropdownSprops
    Tag?: TagSprops
    Mask?: MaskSprops
    Transition?: TransitionSprops
    Notification?: NotificationSprops
  }
}

export const AppSettings = createContext<AppSetting>({})

/**
 * U can customized lots of baseUIs by this <Provider>
 */
export function AppSettingsProvider(props: { userSetting?: AppSetting; children?: ReactNode }) {
  return (
    <AppSettings.Provider value={props.userSetting ?? {}}>{props.children}</AppSettings.Provider>
  )
}

/**
 * for Easy to use/memorize.
 *
 * U should avoid to use it. instead, jest use {@link injectAppSetting} to accelerate the coding
 */
export function useAppSettings() {
  return useContext(AppSettings)
}

/**
 * HOC
 *
 * will merged appSetting automaticly.
 *
 * @param Component the source Component defination function
 * @param defaultProps (optional)
 * @returns a new component that will digest appSetting then pass the merged props to original component.
 */
export function injectAppSetting<C extends FC>(Component: C, defaultProps?: any) {
  const componentName = Component.name || Component.displayName || ''
  const InjectedComponent = (props: Parameters<C>[0]) => {
    const appSettings = useAppSettings()
    const _sprops = mergeProps(appSettings.globalProps?.[componentName], props)
    const sprops = addDefaultProps(_sprops, defaultProps ?? {})
    return <Component {...sprops} />
  }
  return overwriteFunctionName(InjectedComponent, 'S_' + componentName)
}
