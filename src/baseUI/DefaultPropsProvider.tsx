import React, { createContext, ReactNode } from 'react'
import { TagProps } from 'templates/Tag0.5'
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
//#region ------------------- 非props类型声明 -------------------
type ColorString = string
interface DefaultPropsObject {
  // TODO 这里应有另一个GlobalTheme组件
  global?: {
    primaryColor?: ColorString
  }
  ButtonProps?: ButtonProps
  CaptionProps?: CaptionProps
  CardProps?: CardProps
  DivProps?: DivProps
  DropdownProps?: DropdownProps
  IconProps?: IconProps
  ImageProps?: ImageProps
  InputProps?: InputProps
  RowBoxProps?: RowBoxProps
  ScrollProps?: ScrollProps
  TagProps?: TagProps
  TransformProps?: TransformProps
}
//#endregion

//#region ------------------- props声明 -------------------
export interface DefaultPropsProps {
  children?: ReactNode
  defaultProps?: DefaultPropsObject
}
//#endregion

//#region ------------------- 实现 -------------------
export const DefaultPropsContext = createContext<DefaultPropsObject>({})
export default function DefaultPropsProvider(props: DefaultPropsProps) {
  return (
    <DefaultPropsContext.Provider value={props.defaultProps ?? {}}>
      {props.children}
    </DefaultPropsContext.Provider>
  )
}
//#endregion
