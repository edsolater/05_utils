import { createRefHook } from 'baseUI/functions'
import { IRefs } from 'baseUI/functions/mergeRefs'
import parseIRefs from 'baseUI/functions/parseRefs'
import { useEffect } from 'react'
import notExist from 'utils/functions/judgers/notExist'

export interface UseClickOptions {
  /**
   * 就是个快捷方式
   * @default false
   */
  disable?: boolean
  /**
   * 就是普通的onClick
   */
  onClick?: (ev: { el: EventTarget; nativeEvent: MouseEvent }) => void
}

/**
 * 一般不用，直接用Div上的onClick属性
 */
export default function useClick(
  refs: IRefs<HTMLElement>,
  { disable, onClick }: UseClickOptions = {}
) {
  useEffect(() => {
    if (disable || notExist(onClick)) return
    const whenClickInside = (e: Event) => onClick({ el: e.target!, nativeEvent: e as MouseEvent })

    parseIRefs(refs, (cur) => cur.addEventListener('click', whenClickInside))
    return () => parseIRefs(refs, (cur) => cur.removeEventListener('click', whenClickInside))
  }, [disable, onClick])
}

export const useClickRef = createRefHook(useClick)
