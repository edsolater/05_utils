import getType from '../core/getType';

function isSymbol(val: unknown): val is symbol {
  return getType(val) === 'symbol';
}
export default isSymbol
