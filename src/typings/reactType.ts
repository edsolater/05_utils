import { DivProps } from 'baseUI/Div'
import { FC, MutableRefObject } from 'react'

export type IRef<T = undefined> = ((el: T) => void) | MutableRefObject<T | null | undefined> | null | undefined
export interface IFC<T, E extends HTMLElement = HTMLDivElement>
  extends FC<T & { domRef?: IRef<E> } & DivProps> {}
