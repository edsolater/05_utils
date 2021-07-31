import { ReactNode } from 'react'

export type ReactComponent = (...any: any[]) => ReactNode

export type StatePairArray = [state: any, setState: any, controller?: Record<string, any>]