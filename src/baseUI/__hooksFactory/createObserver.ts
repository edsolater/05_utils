import addDefault from "utils/object/addDefault";

interface ObserverOptions {
  feature?: {
    /**
     * 是否返回滚动的X、Y
     */
    scrollPositon?: boolean;
    /**
     * 是否返回检测元素
     */
    isScrolling?: boolean;
  };
}
const defaultOptions:ObserverOptions = {
  feature:{
    scrollPositon:true
  }
}

/**
 * TODO: 这个函数，返回一个造好的hooks。此函数通过domRef，可监听此dom节点的一切交互行为。
 * 
 * IDEA：不好，感觉直接用hooks更符合直觉
 */
export default function createObserver(options:ObserverOptions = {}) {
  addDefault(options, defaultOptions)
}