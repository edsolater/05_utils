export default function composeMultiString(template: string, ...stringArray: Array<string[]>) {
  let resultStrings: string[] = [template]
  stringArray.forEach((placements, index) => {
    placements.forEach(candidate => {
      resultStrings = resultStrings.flatMap(preTemplate =>
        preTemplate.replace(`%${index + 1}`, candidate)
      )
    })
  })
  return resultStrings
}
console.log(composeMultiString('%1: %2', ['hello', 'hi'], ['Bill', 'Simon']))
