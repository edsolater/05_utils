export type Delta2dTranslate = {
  // 水平移动
  dx: number
  // 竖直移动
  dy: number
}
export type Delta2dScale = {
  // 水平放大倍数
  dw: number
  // 竖直放大倍数
  dh: number
}
export type Location2d = {
  //横坐标
  x: number
  // 纵坐标
  y: number
}

export type Delta2d = Delta2dTranslate & Delta2dScale
