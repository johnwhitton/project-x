import {assert} from 'chai';
import {ContractAddresses} from '../ContractAddresses';

it('Test that the abstract class cannot be instantiated', () => {
  assert.throw(() => new ContractAddresses());
});
