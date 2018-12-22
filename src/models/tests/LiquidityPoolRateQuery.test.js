import {assert} from 'chai';
import {Token} from '../Token';
import {LiquidityPoolRateQuery} from '../LiquidityPoolRateQuery';

it('Test the constructor of the LiquidityPoolRateQuery', () => {
  const tokenToBuy = new Token('tokenA', 'tokenAAddress', 50);
  const tokenToSell = new Token('tokenB', 'tokenB');
  const lpRateQuery = new LiquidityPoolRateQuery(tokenToBuy, tokenToSell);
  assert.equal(tokenToBuy, lpRateQuery.tokenToBuy);
  assert.equal(tokenToSell, lpRateQuery.tokenToSell);
});
