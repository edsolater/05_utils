import React, { createContext, ReactNode } from 'react'
import { CSSColorString } from 'style/cssColor'
import { CSSNumber } from 'style/cssUnits'
import { ButtonDefaultCSS } from './Button/style'
// IDEA: 分为等动态更改的、不能动态更改的（不然会混乱）
//#region ------------------- 非props类型声明 -------------------
interface CSSConfigObject {
  button?: ButtonDefaultCSS
}
//#endregion

//#region ------------------- props声明 -------------------
export interface CSSConfigProviderProps {
  children?: ReactNode
  cssConfig?: CSSConfigObject
}
//#endregion

//#region ------------------- 实现 -------------------
export const CSSConfigContext = createContext<CSSConfigObject>({})
export default function CSSConfigProvider(props: CSSConfigProviderProps) {
  return (
    <CSSConfigContext.Provider value={props.cssConfig ?? {}}>
      {props.children}
    </CSSConfigContext.Provider>
  )
}
//#endregion
