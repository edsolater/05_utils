import { GetMapItem } from 'baseUI/types/generic'

const numberList = [
  '0.5',
  '1',
  '1.5',
  '2',
  '2.5',
  '3',
  '3.5',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '14',
  '16',
  '20',
  '24',
  '28',
  '32',
  '36',
  '40',
  '44',
  '48',
  '52',
  '56',
  '60',
  '64',
  '72',
  '80',
  '96'
]
const percentList = [
  '1 / 2',
  '1 / 3',
  '2 / 3',
  '1 / 4',
  '2 / 4',
  '3 / 4',
  '1 / 5',
  '2 / 5',
  '3 / 5',
  '4 / 5',
  '1 / 6',
  '2 / 6',
  '3 / 6',
  '4 / 6',
  '5 / 6',
  '1 / 12',
  '2 / 12',
  '3 / 12',
  '4 / 12',
  '5 / 12',
  '6 / 12',
  '7 / 12',
  '8 / 12',
  '9 / 12',
  '10 / 12',
  '11 / 12'
]
function numberRuleGenerater(n: string, rule: [jss: string, css: string]): [string, string] {
  const [jss, css] = rule
  return [jss.replace('$<number>', n), css.replace('$<number>', n)]
}
function percentRuleGenerater(n: string, rule: [jss: string, css: string]): [string, string] {
  const [jss, css] = rule
  return [jss.replace('$<percent>', n), css.replace('$<percent>', (+n).toFixed(6))]
}

const allShortcuts = new Map([
  /** @see https://tailwindcss.com/docs/background-size  */
  ['bg-cotainer', '$<selector> {background-size: contain}'],
  ['bg-cover', '$<selector> {background-size: cover}'],
  ['bg-auto', '$<selector> {background-size: auto}'],

  /** @see https://tailwindcss.com/docs/background-origin  */
  ['bg-origin-border', '$<selector> {background-origin: border-box}'],
  ['bg-origin-padding', '$<selector> {background-origin: padding-box}'],
  ['bg-origin-content', '$<selector> {background-origin: content-box}'],

  /** @see https://tailwindcss.com/docs/background-clip  */
  ['bg-clip-border', '$<selector> {background-clip: border-box}'],
  ['bg-clip-padding', '$<selector> {background-clip: padding-box}'],
  ['bg-clip-content', '$<selector> {background-clip: content-box}'],
  ['bg-clip-text', '$<selector> {background-clip: text}'],

  /** @see https://tailwindcss.com/docs/background-position  */
  ['bg-top', '$<selector> {background-position: top}'],
  ['bg-bottom', '$<selector> {background-position: bottom}'],
  ['bg-left', '$<selector> {background-position: left}'],
  ['bg-right', '$<selector> {background-position: right}'],
  ['bg-center', '$<selector> {background-position: center}'],
  ['bg-top-left', '$<selector> {background-position: top left}'],
  ['bg-top-right', '$<selector> {background-position: top right}'],

  /** @see https://tailwindcss.com/docs/background-repeat  */
  ['bg-repeat', '$<selector> {background-repeat: repeat}'],
  ['bg-no-repeat', '$<selector> {background-repeat: no-repeat}'],
  ['bg-repeat-x', '$<selector> {background-repeat: repeat-x}'],
  ['bg-repeat-y', '$<selector> {background-repeat: repeat-y}'],
  ['bg-repeat-round', '$<selector> {background-repeat: round}'],
  ['bg-repeat-space', '$<selector> {background-repeat: space}'],

  /** @see https://tailwindcss.com/docs/background-repeat  */
  ['bg-repeat', '$<selector> {background-repeat: repeat}'],
  ['bg-no-repeat', '$<selector> {background-repeat: no-repeat}'],
  ['bg-repeat-x', '$<selector> {background-repeat: repeat-x}'],
  ['bg-repeat-y', '$<selector> {background-repeat: repeat-y}'],
  ['bg-repeat-round', '$<selector> {background-repeat: round}'],
  ['bg-repeat-space', '$<selector> {background-repeat: space}'],

  /** @see https://tailwindcss.com/docs/cursor  */
  ['cursor-auto', '$<selector> {cursor: auto}'],
  ['cursor-default', '$<selector> {cursor: default}'],
  ['cursor-pointer', '$<selector> {cursor: pointer}'],
  ['cursor-wait', '$<selector> {cursor: wait}'],
  ['cursor-text', '$<selector> {cursor: text}'],
  ['cursor-move', '$<selector> {cursor: move}'],
  ['cursor-help', '$<selector> {cursor: help}'],
  ['cursor-not-allowed', '$<selector> {cursor: not-allowed}'],

  /** @see https://tailwindcss.com/docs/border-width  */
  ['border', '$<selector> {border-width: 1px}'],
  ['border-t', '$<selector> {border-top-width: 1px}'],
  ['border-r', '$<selector> {border-right-width: 1px}'],
  ['border-b', '$<selector> {border-bottom-width: 1px}'],
  ['border-l', '$<selector> {border-left-width: 1px}'],
  ...numberList.map((n) =>
    numberRuleGenerater(n, ['border-$<number>', '$<selector> {border-width: $<number>px}'])
  ),
  ...numberList.map((n) =>
    numberRuleGenerater(n, ['border-t-$<number>', '$<selector> {border-top-width: $<number>px}'])
  ),
  ...numberList.map((n) =>
    numberRuleGenerater(n, ['border-r-$<number>', '$<selector> {border-right-width: $<number>px}'])
  ),
  ...numberList.map((n) =>
    numberRuleGenerater(n, ['border-b-$<number>', '$<selector> {border-bottom-width: $<number>px}'])
  ),
  ...numberList.map((n) =>
    numberRuleGenerater(n, ['border-l-$<number>', '$<selector> {border-left-width: $<number>px}'])
  ),

  /** @see https://tailwindcss.com/docs/user-select  */
  ['select-none', '$<selector> {user-select: none}'],
  ['select-text', '$<selector> {user-select: text}'],
  ['select-all', '$<selector> {user-select: all}'],
  ['select-auto', '$<selector> {user-select: auto}'],

  /**
   * box-sizing(layout)
   * @see https://tailwindcss.com/docs/box-sizing
   */
  ['box-border', '$<selector> {box-sizing: border-box}'],
  ['box-content', '$<selector> {box-sizing: content-box}'],

  /**
   * width(sizing)
   * @see https://tailwindcss.com/docs/width
   */
  ['w-auto', '$<selector>{width: auto}'],
  ['w-full', '$<selector>{width: 100%}'],
  ['w-screen', '$<selector>{width: 100vw}'],
  ['w-min', '$<selector>{width: min-content}'],
  ['w-max', '$<selector>{width: max-content}'],
  ...numberList.map((n) =>
    numberRuleGenerater(n, ['w-$<number>', '$<selector>{width: calc($<number> * 4px)}'])
  ),
  ...percentList.map((n) =>
    percentRuleGenerater(n, ['w-$<precent>', '$<selector>{width: calc($<precent>) * 100%}'])
  ),

  /**
   * height(sizing)
   * @see https://tailwindcss.com/docs/height
   */
  ['h-auto', '$<selector>{height: auto}'],
  ['h-full', '$<selector>{height: 100%}'],
  ['h-screen', '$<selector>{height: 100vw}'],
  ['h-min', '$<selector>{height: min-content}'],
  ['h-max', '$<selector>{height: max-content}'],
  ...numberList.map((n) =>
    numberRuleGenerater(n, ['h-$<number>', '$<selector>{height: calc($<number> * 4px)}'])
  ),
  ...percentList.map((n) =>
    percentRuleGenerater(n, ['h-$<precent>', '$<selector>{height: calc($<precent>) * 100%}'])
  ),

  /**
   * padding(spacing)
   * @see https://tailwindcss.com/docs/padding
   */
  ...numberList.map((n) =>
    numberRuleGenerater(n, ['p-$<number>', '$<selector>{padding: calc($<number> * 4px)}'])
  ),
  ...numberList.map((n) =>
    numberRuleGenerater(n, [
      'px-$<number>',
      '$<selector> {padding-left: calc($<number> * 4px); padding-right: calc($<number> * 4px)}'
    ])
  ),
  ...numberList.map((n) =>
    numberRuleGenerater(n, [
      'py-$<number>',
      '$<selector> {padding-top: calc($<number> * 4px); padding-bottom: calc($<number> * 4px)}'
    ])
  ),
  ...numberList.map((n) =>
    numberRuleGenerater(n, ['pt-$<number>', '$<selector> {padding-top: calc($<number> * 4px)}'])
  ),
  ...numberList.map((n) =>
    numberRuleGenerater(n, ['pr-$<number>', '$<selector> {padding-right: calc($<number> * 4px)}'])
  ),
  ...numberList.map((n) =>
    numberRuleGenerater(n, ['pb-$<number>', '$<selector> {padding-bottom: calc($<number> * 4px)}'])
  ),
  ...numberList.map((n) =>
    numberRuleGenerater(n, ['pl-$<number>', '$<selector> {padding-left: calc($<number> * 4px)}'])
  )
] as const)

export type AllShortcuts = GetMapItem<typeof allShortcuts>

export const shortcutsRegx = /(bg|)/
export function isShortcut(p: any) {
  return allShortcuts.has(p)
}
