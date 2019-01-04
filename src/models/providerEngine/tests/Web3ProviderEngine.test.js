import {assert} from 'chai';
import {Web3ProviderEngine} from '../Web3ProviderEngine';

it('Test the Web3ProviderEngine constructor', () => {
  const providerEngine = new Web3ProviderEngine();
  assert.isOk(providerEngine);
});
