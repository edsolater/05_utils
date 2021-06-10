// sm: (min-width: 640px)
// md: (min-width: 768px)
// lg: (min-width: 1024px)
// xl: (min-width: 1280px)
// 2xl: (min-width: 1536px)

import useMedia from './useMedia'

type BreakPoints = typeof breakPointsSort[number]
const configs = {
  '2xl': '(min-width: 1536px)',
  xl: '(min-width: 1280px)',
  lg: '(min-width: 1024px)',
  md: '(min-width: 768px)',
  ms: '(min-width: 640px)'
}

// bigger breakpoints should be tested before smaller breakpoints
const breakPointsSort = ['2xl', 'xl', 'lg', 'md', 'ms'] as const

export default function useBreakPoints<T extends BreakPoints[]>(
  enablePoints: T,
  defaultBreakPoint?: T[number]
): [T[number]] {
  const sortedPoints = sort(enablePoints)
  const currentBreakPoints = useMedia<BreakPoints>(
    sortedPoints.map((p) => configs[p]),
    sortedPoints,
    defaultBreakPoint ?? sortedPoints[sortedPoints.length - 1]
  )
  return [currentBreakPoints]
}

function sort(enablePoints: BreakPoints[]): BreakPoints[] {
  return breakPointsSort.filter((p) => enablePoints.includes(p))
}
