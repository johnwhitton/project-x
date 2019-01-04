import {assert} from 'chai';
import {ContractWrappers} from '../ContractWrappers';

it('Test that the abstract class cannot be instantiated', () => {
  assert.throw(() => new ContractWrappers());
});
