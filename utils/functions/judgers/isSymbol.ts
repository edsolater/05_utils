import _getType from './_getType';

function isSymbol(val: unknown): val is symbol {
  return _getType(val) === 'symbol';
}
export default isSymbol
