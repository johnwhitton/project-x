import {assert} from 'chai';
import {
  convertValueToTokenDecimals,
  convertValueFromTokenDecimals,
  getTokenToCowriRatio,
} from '../utils';

it('Test converting a value to token decimals', () => {
  const value = 13.2943;
  const expectedResult = 13294300000000000000;
  const decimals = 18;
  assert.equal(expectedResult, convertValueToTokenDecimals(value, decimals));
});

it('Test converting token decimals to a value', () => {
  const expectedResult = 13.2943;
  const value = 13294300000000000000;
  const decimals = 18;
  assert.equal(expectedResult, convertValueFromTokenDecimals(value, decimals));
});
