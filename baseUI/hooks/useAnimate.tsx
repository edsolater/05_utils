import { RefObject, useEffect } from 'react';

export interface UseAnimateOptions {
  keyframes?: Parameters<Animatable['animate']>[0];
  options?: Parameters<Animatable['animate']>[1];
}
export function useAnimate(ref: RefObject<HTMLElement | null | undefined>, options?: UseAnimateOptions) {
  useEffect(() => {
    ref.current?.animate(options?.keyframes ?? null, options?.options);
  }, []);
}
