import {Token} from './Token';

export class LiquidityPoolRateQuery {
  constructor(tokenToBuy, tokenToSell) {
    this.tokenToBuy = tokenToBuy;
    this.tokenToSell = tokenToSell;
  }
}
