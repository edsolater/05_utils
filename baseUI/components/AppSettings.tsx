import { addDefaultProps, mergeProps } from 'baseUI/functions'
import React, { ComponentProps, createContext, FC, ReactNode, useContext } from 'react'
import { overwriteFunctionName } from '@edsolater/fnkit/dist/functionFactory'
import { ButtonProps } from './Button'
import { CaptionProps } from './Caption'
import { CardProps } from './Card'
import { DropdownProps } from './Dropdown'
import { IconProps } from './Icon'
import { ImageProps } from './Image'
import { InputProps } from './Input'
import { MaskProps } from './Mask'
import { NotificationSprops } from './Notification'
import { RowProps } from './Row'
import { TagProps } from './Tag'
import { TransitionProps } from './Transition'

export interface AppSetting {
  /**
   * baseUI的css的具体值（可能不包含在props中， 是CSS的尺寸细节）
   */
  globalProps?: {
    Button?: ButtonProps
    Caption?: CaptionProps
    Card?: CardProps
    Icon?: IconProps
    Image?: ImageProps
    Input?: InputProps
    Row?: RowProps
    Dropdown?: DropdownProps
    Tag?: TagProps
    Mask?: MaskProps
    Transition?: TransitionProps
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
export function injectAppSetting<C extends FC>(Component: C, defaultProps?: ComponentProps<C>) {
  const componentName = Component.name || Component.displayName || ''
  const InjectedAppSetting = (props: Parameters<C>[0]) => {
    const appSettings = useAppSettings()
    const _sprops = mergeProps(appSettings.globalProps?.[componentName], props)
    const sprops = addDefaultProps(_sprops, defaultProps ?? {})
    return <Component {...sprops} />
  }
  return InjectedAppSetting
}
