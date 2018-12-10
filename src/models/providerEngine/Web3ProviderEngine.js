import {ProviderEngine} from './ProviderEngine';
const ImportedWeb3ProviderEngine = require('web3-provider-engine');

export class Web3ProviderEngine extends ProviderEngine {

  constructor() {
    super();
    this.web3ProviderEngine = new ImportedWeb3ProviderEngine();
  }

  addProvider = (provider) => {
    this.web3ProviderEngine.addProvider(provider);
  }

  start = () => {
    this.web3ProviderEngine.start();
  }

  sendAsync = async () => {
    await this.web3ProviderEngine.sendAsync();
  }

}
