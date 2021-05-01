import React from 'react'
import Div, { divProps, DivProps } from 'baseUI/Div'
import { mix } from 'style/cssParser'
import pick from 'utils/object/pick'
import { useMemo } from 'react'
import { cssVar } from 'style/cssFunctions'
import { cssValues } from 'style/cssValue'

//#region ------------------- props声明 -------------------
export interface BaseUIThemeProps extends DivProps, BaseUIThemeStyleProps {}
interface BaseUIThemeStyleProps {
  /**
   * CSS: 卡片的颜色
   */
  color?: string
  /**
   * CSS: 卡片的背景图片（background能接收即可）
   */
  bgImg?: string
  /**
   * CSS: 卡片的渐变图片
   */
  gradient?: string
  /**
   * CSS
   */
  width?: number | string
  /**
   * CSS
   */
  height?: number | string
  /**
   * CSS
   */
  borderRadius?: 'small' | 'middle' | 'large'
}
//#endregion

//#region ------------------- 实现 -------------------
export default function BaseUITheme(props: BaseUIThemeProps) {
  const { coreCss } = useBaseUIThemeStyle(props)
  return <Div {...pick(props, divProps)} css={mix(props.css, coreCss)} />
}
//#endregion

//#region ------------------- 样式 -------------------
const useBaseUIThemeStyle = ({
  color,
  bgImg,
  gradient,
  borderRadius,
  width,
  height
}: BaseUIThemeStyleProps) => {
  const coreCss = useMemo(
    () =>
      mix({
        width: cssVar('--baseUiTemplate-width', width ?? 'unset'),
        height: cssVar('--baseUiTemplate-width', height ?? 'unset'),
        borderRadius: borderRadius === 'small' ? 4 : borderRadius === 'large' ? 32 : 8,
        boxShadow: cssValues.smoothShadow,
        background: bgImg ? `url(${bgImg}) center / cover` : gradient,
        backgroundColor: color
      }),
    [color, bgImg, gradient, borderRadius, width, height]
  )

  return { coreCss }
}
//#endregion
