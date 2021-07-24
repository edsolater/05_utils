import checkInBrowserMainThread from 'utils/functions/dom/checkInBrowserMainThread'

let jssStyleSheet: CSSStyleSheet | undefined = undefined

/**
 * @param  validCSSRules Accepts an array of JSON-encoded declarations
 * @example
 * addStylesheetRules('h2', {
 *   color: 'red',
 *   'background-color': 'green'
 * })
 */
//TODO: cache
export function insertCSSRules(
  selector: string,
  cssPropertyPairs: { [cssProperty: string]: string }
) {
  if (!jssStyleSheet && checkInBrowserMainThread()) {
    const styleEl = document.createElement('style')

    // Append <style> element to <head>, so it can work
    document.head.appendChild(styleEl)

    // Grab style element's sheet
    jssStyleSheet = styleEl.sheet!
  }

  return jssStyleSheet!.insertRule(
    `${selector}:{${Object.entries(cssPropertyPairs)
      .map(([props, value]) => `${props}: ${value}`)
      .join(';')}}`
  )
}

/**
 *
 * @param p kebab-case string
 * @example
 * splitJSSString('padding-box-80px-top-left') // => ['padding-box', '80px', 'top left']
 */
export function splitJSSString(p: string) {
  return p.split('-') // TODO
}

export function isCSSLength(p: string) {
  return /^-?\d\w+|0$/.test(p)
}
