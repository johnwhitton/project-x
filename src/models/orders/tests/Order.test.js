import {assert} from 'chai';
import {Order} from '../Order';

it('Test that the abstract class cannot be instantiated', () => {
  assert.throw(() => new Order());
});
