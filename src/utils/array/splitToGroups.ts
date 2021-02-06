/**
 * 以${groupSize}为一组，进行分割
 * @param items 原数组
 * @param groupSize 分割的块的容量
 * @example
 * const splited = splitToGroups(['aa', 'bb', 'cc'], 2) // [['aa','bb'], ['cc']]
 */
export function splitToGroups<T>(items: T[], groupSize: number) {
  const result: T[][] = [];
  let group: T[] = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    group.push(item);
    if (group.length === groupSize || i === items.length - 1) {
      result.push(group);
      group = [];
    }
  }
  return result;
}
