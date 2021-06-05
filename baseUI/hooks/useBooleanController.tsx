import { useState } from 'react'

interface BooleanController {
  /**
   * 指示当前状态：开/闭
   */
  state: boolean
  turnOn(): void
  turnOff(): void
  toggle(): void
}
export default function useBooleanController(init?: boolean): BooleanController {
  const [open, setopen] = useState<boolean>(init ?? false)
  const controller: BooleanController = {
    state: open,
    turnOn() {
      setopen(true)
    },
    turnOff() {
      setopen(false)
    },
    toggle() {
      setopen((b) => !b)
    }
  }
  return controller
}
