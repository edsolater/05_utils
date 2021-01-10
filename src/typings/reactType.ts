import { FC, RefObject } from 'react'

type IRef<T> = ((el: T) => void) | RefObject<T> | null

export interface IFC<T> extends FC<T & { domRef?: IRef<HTMLElement> }> {}
