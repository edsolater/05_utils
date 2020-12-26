/****************************
 *
 * 此文件用于存放对事件及其回调的定义
 * 该定义与业务强相关
 * 被core.ts引用
 *
 ***************************/
export type EventBus = {
  loadPage: (name: 'hello') => void
  loasdf: (woel: 'number') => void
}