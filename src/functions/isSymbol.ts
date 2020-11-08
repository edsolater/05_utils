import getType from './getType';

function isSymbol(val: unknown): val is symbol {
  return getType(val) === 'symbol';
}
export default isSymbol
