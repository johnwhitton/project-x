import {ExchangeContract} from '../ExchangeContract';
import {assert} from 'chai';

it ('Test that the abstract class cannot be instantiated', () => {
  assert.throw(() => new ExchangeContract());
});
