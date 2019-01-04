import {ProviderEngine} from './ProviderEngine';
import {Web3ProviderEngine as ImportedWeb3ProviderEngine} from '0x.js';

export class Web3ProviderEngine extends ProviderEngine {
  constructor() {
    super();
    this.web3ProviderEngine = new ImportedWeb3ProviderEngine();
  }

  addProvider = provider => {
    this.web3ProviderEngine.addProvider(provider);
  };

  start = () => {
    this.web3ProviderEngine.start();
  };

  //because 0x requires their provider engine.
  getEngine = () => {
    return this.web3ProviderEngine;
  };
}
