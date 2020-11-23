export type Delta2dTranslate = {
  // 水平移动距离
  dx: number
  // 竖直移动距离
  dy: number
}
export type Delta2dScale = {
  // 水平放大倍数
  scaleRate:number
}
export type Location2d = {
  // 横坐标
  x: number
  // 纵坐标
  y: number
}

export type Delta2d = Delta2dTranslate & Delta2dScale
