/**
 * 计算三角形斜边长度
 * @param dx 直角边X
 * @param dy 直角边Y
 */
export default function calcHypotenuse(dx: number, dy: number): number {
  return Math.sqrt(dx ** 2 + dy ** 2);
}
