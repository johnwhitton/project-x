import {Provider} from './Provider';
import {ProviderEngine} from '../providerEngine/ProviderEngine';
import {Web3} from 'web3';

export class Web3Provider extends Provider{

  constructor(providerEngine) {
    this.web3Provider = new Web3(providerEngine);
  }

  awaitTransactionSuccessAsync = async (txHash) => {
    await this.web3Provider.awaitTransactionSuccessAsync(txHash);
  }

  getAvailableAddressesAsync = async () => {
    return await Web3.getAvailableAddressesAsync();
  }

}
