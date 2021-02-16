import { ID } from 'typings/constants'
type ActionId = ID
type TimeoutHandle = () => void
type TimeoutCenter = Map<ActionId, { fn: TimeoutHandle; actionId?: ActionId; timeoutId: number }>
const center: TimeoutCenter = new Map()

let idCache = 1

/**用的还是setTimeout，但是返回的是控制器 */
export default function timeout(
  handler: TimeoutHandle,
  timeout?: number,
  options?: {
    /**具有相同actionId 的settimeout函数会互相覆盖 */
    actionId?: ActionId
  }
) {
  const actionId = options?.actionId ?? (`_timeout_action_id_${idCache++}` as ActionId)
  const controller = {
    actionId: actionId,
    timeoutId: undefined as number | undefined,
    cancel() {
      if (controller.timeoutId) {
        window.clearTimeout(controller.timeoutId)
        controller.timeoutId = undefined
      }
    }
  }

  if (center.has(actionId)) window.clearTimeout(center.get(actionId)!.timeoutId)

  controller.timeoutId = window.setTimeout(() => {
    handler()
    center.delete(actionId)
  }, timeout)

  center.set(actionId, { fn: handler, actionId, timeoutId: controller.timeoutId })
  return controller
}
