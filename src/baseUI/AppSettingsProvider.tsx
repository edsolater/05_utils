import React, { createContext, ReactNode } from 'react'
import { TagProps } from './Tag'
import { ButtonProps } from './Button'
import { CaptionProps } from './Caption'
import { CardProps } from './Card'
import { DivProps } from './Div'
import { DropdownProps } from './Dropdown'
import { IconProps } from './Icon'
import { ImageProps } from './Image'
import { InputProps } from './Input'
import { RowBoxProps } from './RowBox'
import { ScrollProps } from './Scroll/_interface'
import { TransformProps } from './Transform'
import { ButtonDetailCSS } from './Button/defaultStyle'

//#region ------------------- props声明 -------------------
export interface AppSetting {
  props?: {
    Button?: ButtonProps
    Caption?: CaptionProps
    Card?: CardProps
    Div?: DivProps
    Dropdown?: DropdownProps
    Icon?: IconProps
    Image?: ImageProps
    Input?: InputProps
    RowBox?: RowBoxProps
    Scroll?: ScrollProps
    Tag?: TagProps
    Transform?: TransformProps
  }
  /**
   * baseUI的css的具体值（可能不包含在props中）
   */
  css?:{
    Button?: ButtonDetailCSS
  }
}
//#endregion

//#region ------------------- 实现 -------------------
export const AppSettings = createContext<AppSetting>({})
export default function AppSettingsProvider(props: AppSetting & {children?:ReactNode}) {
  return (
    <AppSettings.Provider value={props?? {}}>
      {props.children}
    </AppSettings.Provider>
  )
}
//#endregion
