/**
 *
 * @param params 判断节点类型
 */
export function isTextNode(node: Node): node is Text {
  return node.nodeType === Node.TEXT_NODE
}
