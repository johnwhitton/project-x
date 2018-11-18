import {Token} from '../Token';
import {LiquidityPoolRateQuery} from '../LiquidityPoolRateQuery';
import {assert} from 'chai';

it('Test the constructor of the LiquidityPoolRateQuery', () => {
  let tokenToBuy = new Token("tokenA", "tokenAAddress", 50);
  let tokenToSell = new Token("tokenB", "tokenB");
  let lpRateQuery = new LiquidityPoolRateQuery(tokenToBuy, tokenToSell);
  assert.equal(tokenToBuy, lpRateQuery.tokenToBuy);
  assert.equal(tokenToSell, lpRateQuery.tokenToSell);
});

