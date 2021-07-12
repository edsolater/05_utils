import { createRefHook, mergeProps } from 'baseUI/functions'
import React, { ReactNode, RefObject, useRef } from 'react'
import AttachClickable, {
  AttachClickableInjectProps,
  AttachClickableProps,
  useClick,
  UseClickOptions
} from './AttachClickable'
import AttachHoverable, {
  AttachHoveableInjectProps,
  AttachHoverableProps,
  useHover,
  UseHoverOptions
} from './AttachHoverable'

//#region ------------------- hook: useButtonLike -------------------
export interface UseButtonLikeOptions extends UseHoverOptions, UseClickOptions {}

export function useButtonLike(ref: RefObject<HTMLElement>, options: UseButtonLikeOptions = {}) {
  const isActive = useClick(ref, options)
  const isHovered = useHover(ref, options)
  return { isActive, isHovered }
}

export const useButtonLikeRef = createRefHook(useButtonLike)
//#endregion

export interface AttachButtonLikeProps extends AttachHoverableProps, AttachClickableProps {
  children?: ReactNode
}

export interface AttachButtonLikeInjectProps extends AttachHoveableInjectProps, AttachClickableInjectProps {}

/**
 * @WrapperComponent make it child buttonLike (it's a hollowComponent)
 *
 * passProps: see {@link Clickable} and {@link Hoverable}
 * @todo add ARIA for better SEO
 * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
 */
export default function AttachButtonLike({ children, ...restProps }: AttachButtonLikeProps) {
  const domRef = useRef<HTMLElement>(null)
  return (
    <AttachClickable {...mergeProps(restProps, { domRef })}>
      <AttachHoverable>{children}</AttachHoverable>
    </AttachClickable>
  )
}
