import {ExchangeContract} from './ExchangeContract';
import {ZeroExExchangeAddress} from '../Constants';

export class ZeroExExchangeContract extends ExchangeContract {

  constructor() {
    super();
    super.ExchangeAddress = ZeroExExchangeAddress;
  }

}
