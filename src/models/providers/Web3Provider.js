import {Provider} from './Provider';
import {ProviderEngine} from '../providerEngine/ProviderEngine';
import {Web3Wrapper} from '@0x/web3-wrapper';

export class Web3Provider extends Provider{

  constructor(providerEngine) {
    super();
    this.web3Provider = new Web3Wrapper(providerEngine);
  }

  awaitTransactionSuccessAsync = async (txHash) => {
    this.web3Provider.awaitTransactionSuccessAsync(txHash);
  }

  getAvailableAddressesAsync = () => {
    return this.web3Provider.getAvailableAddressesAsync();
  }

}
