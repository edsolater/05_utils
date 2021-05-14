import { useEffect, useRef } from 'react'

export default function useMouseWheel(
  ref: React.RefObject<HTMLElement>,
  cb?: (info: { eventObject: WheelEvent; distance: number }) => void
) {
  const eventObjectRef = useRef<WheelEvent>(null)
  const scrollDistance = useRef(0)

  useEffect(() => {
    const updateScroll = (e: WheelEvent) => {
      const newDistance = e.pageY + scrollDistance.current
      cb?.({ eventObject: e, distance: newDistance })
      scrollDistance.current = newDistance
    }
    ref.current?.addEventListener('wheel', updateScroll)
  })

  return { eventObject: eventObjectRef.current }
}

//IDEA： 还可以代替Div的.feature.ts
