import {assert} from 'chai';
import {ProviderEngine} from '../ProviderEngine';

it('Test that the abstract class cannot be instantiated', () => {
  assert.throw(() => new ProviderEngine());
});
