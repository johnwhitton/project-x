import {Provider} from './providers/Provider';
import {ExchangeContract} from './exchangeContracts/ExchangeContract';
import {TokenSwapOrder} from './OrderFiller';

export class OrderFiller {
  constructor(provider, exchangeContract, order) {
    this.provider = provider;
    this.exchangeContract = exchangeContract;
    this.order = order;
  }
}
