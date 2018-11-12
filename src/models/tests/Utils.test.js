import { convertValueToTokenDecimals, convertValueFromTokenDecimals, getTokenToCowriRatio } from '../main/utils';
import {assert} from 'chai';

it('Test converting a value to token decimals', () => {
  let value = 13.2943;
  let expectedResult = 13294300000000000000;
  let decimals = 18;
  assert.equal(expectedResult, convertValueToTokenDecimals(value, decimals));
});

it('Test converting token decimals to a value', () => {
  let expectedResult= 13.2943;
  let value = 13294300000000000000;
  let decimals = 18;
  assert.equal(expectedResult, convertValueFromTokenDecimals(value, decimals));
});

