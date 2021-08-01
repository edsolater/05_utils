import { ID } from 'typings/constants'
type IOActionInfo = { id: ID }
type IOAction<Extra = {}> = (actionInfo: IOActionInfo & Extra) => void

/**
 * @namespace IOStack
 */
export default class IOStack<T extends { [extraInfo: string]: any }> {
  /**
   * action id gen
   */
  ioCounter = 0
  /**
   * a flag, will cause {@link IOStack#push} invoke it's input action
   */
  isMachineStart = false
  /**
   * if machine is start, actionInfo must not be undefined
   */
  actionInfo: T | undefined = undefined
  /**
   * record actions when machine is not ready
   */
  unHandledIOs = new Map<ID, IOAction<T>>()

  /**
   * push an action to stack (if machine start, input action will start immediately)
   * @param ioAction
   * @returns action ID (if machine start, returned ID will be useLess)
   */
  push(ioAction: IOAction<T>): ID {
    const ioID = ++this.ioCounter
    this.unHandledIOs.set(ioID, ioAction)
    if (this.isMachineStart) {
      this.handleAction(ioID)
    }
    return ioID
  }

  /**
   * no need invoke this manually, instead use {@link IOStack#startMachine}
   * @returns whether success or not
   */
  private handleAction(id: ID): boolean {
    if (!this.actionInfo) return false
    this.unHandledIOs.get(id)?.({ id, ...this.actionInfo })
    return this.unHandledIOs.delete(id)
  }

  /**
   * from now on, every action will invoke immediately
   * @param actionInfo
   */
  startMachine(actionInfo?: T): boolean {
    if (actionInfo) this.actionInfo = actionInfo
    if (this.actionInfo) {
      this.isMachineStart = true
      this.unHandledIOs.forEach((_, id) => this.handleAction(id))
      return true
    } else {
      return false
    }
  }

  /**
   * @param actionInfo
   */
  addActionInfo(actionInfo: T): void {
    this.actionInfo = actionInfo
  }

  /**
   * just a type tool, it will do nothind
   * @param fn
   * @returns same as input
   */
  createAction<F extends (actionInfo: T) => void>(fn: F): F {
    return fn
  }
}
