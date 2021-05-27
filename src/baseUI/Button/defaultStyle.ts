import cssFont from 'baseUI/__config/cssFont'
import cssSize from 'baseUI/__config/cssSize'
import cssColor from 'baseUI/__config/cssColor'
import { cssBrightness, cssVar } from 'style/cssFunctions'
import { mixCSSObjects } from 'style/cssParser'
import cache from 'utils/functionFactory/cache'
import { ButtonProps } from '.'
import merge from 'utils/object/merge'
/**
 * 声明组件有哪些props是纯粹改变外观的
 */
export interface ButtonStyleProps {
  /**
   * 按钮元素的权重
   * 默认：border（空心按钮）
   */
  type?: 'fill' | 'border' | 'text'
  /**
   * 按钮的大小
   */
  size?: 'small' | 'medium' | 'large'
  // TODO 按钮内字母全大写（这样更符合规范，用css font-variant）
  // autoUppercase?: boolean
}
const defaultStyleProps: ButtonStyleProps = {
  type: 'fill',
  size: 'medium'
}

export interface ButtonDetailCSS {
  padding_small?: string
  fontSize_small?: string
  borderRadius_small?: string

  padding_medium?: string
  fontSize_medium?: string
  borderRadius_medium?: string

  padding_large?: string
  fontSize_large?: string
  borderRadius_large?: string
}
const defaultCSSDetail: ButtonDetailCSS = {
  padding_small: `${cssSize.mini} ${cssSize.large}`,
  fontSize_small: cssFont.medium,
  borderRadius_small: cssSize.mini,
  padding_medium: `${cssSize.mini} ${cssSize.large}`,
  fontSize_medium: cssFont.medium,
  borderRadius_medium: cssSize.mini,
  padding_large: `${cssSize.mini} ${cssSize.large}`,
  fontSize_large: cssFont.medium,
  borderRadius_large: cssSize.mini
}

//IDEA: 正常情况下，需要更改的只有颜色和尺寸信息（程度信息），因为能过渡处理
export type ButtonCSSVariableNames =
  | '--button-background-color'
  | '--button-text-color'
  | '--button-border-color'
  | '--button-border-line-width'
  | '--button-border-line-opacity'
  | '--button-padding_small'
  | '--button-font-size_small'
  | '--button-border-radius_small'
  | '--button-padding_medium'
  | '--button-font-size_medium'
  | '--button-border-radius_medium'
  | '--button-padding_large'
  | '--button-font-size_large'
  | '--button-border-radius_large'

export const getButtonCSS = cache(
  (cssDetailFromSetting: ButtonDetailCSS, bareProps: ButtonProps) => {
    const props = merge(defaultStyleProps, bareProps)
    const cssDetail = merge(defaultCSSDetail, cssDetailFromSetting)
    return mixCSSObjects(
      props.css,
      {
        style: 'none',
        borderWidth: 0,
        cursor: 'pointer',
        userSelect: 'none',
        width: 'max-content',
        boxSizing: 'border-box'
      },
      props.size === 'small' && {
        padding: cssVar('--button-padding_small', cssDetail.padding_small),
        fontSize: cssVar('--button-font-size_small', cssDetail.fontSize_small),
        borderRadius: cssVar('--button-border-radius_small', cssDetail.borderRadius_small)
      },
      props.size === 'medium' && {
        padding: cssVar('--button-padding_medium', cssDetail.padding_medium),
        fontSize: cssVar('--button-font-size_medium', cssDetail.fontSize_medium),
        borderRadius: cssVar('--button-border-radius_medium', cssDetail.borderRadius_medium)
      },
      props.size === 'large' && {
        padding: cssVar('--button-padding_large', cssDetail.padding_large),
        fontSize: cssVar('--button-font-size_large', cssDetail.fontSize_large),
        borderRadius: cssVar('--button-border-radius_large', cssDetail.borderRadius_large)
      },
      props.type === 'fill' && {
        color: cssVar('--button-text-color', 'white'),
        position: 'relative',
        background: 'none',
        '::before': {
          content: "''",
          position: 'absolute',
          inset: '0',
          borderRadius: 'inherit',
          zIndex: '-1',
          background: cssVar('--button-background', cssColor.defaultBackgroundGray)
        },
        ':hover::before': { filter: cssBrightness(1.4) },
        ':active::before': { filter: cssBrightness(0.8) }
      },
      props.type === 'border' && {
        position: 'relative',
        background: cssColor.transparent,
        color: cssVar('--button-text-color'),
        '::before': {
          content: "''",
          position: 'absolute',
          inset: '0',
          borderRadius: 'inherit',
          borderWidth: cssVar('--button-border-line-width', '1px'),
          borderStyle: 'solid',
          borderColor: cssVar('--button-border-color', 'currentcolor'),
          opacity: cssVar('--button-border-line-opacity', '0.3'),
          color: 'inherit'
        }
      },
      props.type === 'text' && {
        color: cssVar('--button-text-color'),
        background: 'transparent'
      }
    )
  }
)
