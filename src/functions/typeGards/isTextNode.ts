/**
 * 该DOM节点是文字节点
 * @param node 需要判定的节点 
 */
export default function isTextNode(node: Node): node is Text {
  return node.nodeType === Node.TEXT_NODE
}
