import { DivProps } from 'baseUI/Div'
import { FC, MutableRefObject } from 'react'

export type IRef<T> = ((el: T) => void) | MutableRefObject<T | null> | null
export interface IFC<T, E extends HTMLElement = HTMLDivElement> extends FC<T & { domRef?: IRef<E> } & DivProps> {}
