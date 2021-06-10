import React, { createContext, ReactNode, useContext } from 'react'
import { ButtonDetailCSS } from './Button'
import { CaptionDetailCSS } from './Caption'

//#region ------------------- props声明 -------------------

export interface AppSetting {
  /**
   * baseUI的css的具体值（可能不包含在props中， 是CSS的尺寸细节）
   */
  baseUICSS?: {
    Button?: ButtonDetailCSS
    Caption?: CaptionDetailCSS
  }
}
//#endregion

// IDEA：他不应该是一个Component. 而是一个自定义hook
//#region ------------------- 实现 -------------------
export const AppSettings = createContext<AppSetting>({})
export default function AppSettingsProvider(props: AppSetting & { children?: ReactNode }) {
  return <AppSettings.Provider value={props ?? {}}>{props.children}</AppSettings.Provider>
}
//#endregion

// 只有 Provider 级别组件，才有组件hook。

export function useAppSettings(){
  return useContext(AppSettings)
}