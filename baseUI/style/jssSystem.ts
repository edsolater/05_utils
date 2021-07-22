let customedStyleSheet: CSSStyleSheet | undefined = undefined

/**
 * @param  validCSSRules Accepts an array of JSON-encoded declarations
 * @example
 * addStylesheetRules('h2', {
 *   color: 'red',
 *   'background-color': 'green'
 * })
 */
function insertCSSRules(selector: string, cssPropertyPairs:{ [cssProperty: string]: string }) {
  if (!customedStyleSheet) {
    // to check if in brower.
    if (!Reflect.has(globalThis, 'document')) return

    const styleEl = document.createElement('style')

    // Append <style> element to <head>, so it can work
    document.head.appendChild(styleEl)

    // Grab style element's sheet
    customedStyleSheet = styleEl.sheet!
  }

    customedStyleSheet!.insertRule(
      `${selector}:{${Object.entries(cssPropertyPairs)
        .map(([props, value]) => `${props}: ${value}`)
        .join(';')}}`
    )
}
