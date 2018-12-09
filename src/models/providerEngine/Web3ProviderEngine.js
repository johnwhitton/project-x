import {ProviderEngine} from './ProviderEngine';
const Web3ProviderEngine = require('web3-provider-engine');

export class Web3ProviderEngine extends ProviderEngine {

  constructor() {
    super();
  }

  addProvider = (provider) => {
    Web3ProviderEngine.addProvider(provider);
  }

  start = () => {
    Web3ProviderEngine.start();
  }

}
