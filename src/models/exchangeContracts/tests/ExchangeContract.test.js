import {assert} from 'chai';
import {ExchangeContract} from '../ExchangeContract';

it('Test that the abstract class cannot be instantiated', () => {
  assert.throw(() => new ExchangeContract());
});
