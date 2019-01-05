import {assert} from 'chai';
import {Token} from '../Token';

it('Test the constructor of the Token', () => {
  const testToken = new Token('Test Token A', 'tokenaddress');
  assert.equal('Test Token A', testToken.name);
  assert.equal('tokenaddress', testToken.address);
  assert.equal(0, testToken.balance);
  assert.equal(18, testToken.decimals);
});

it('Test getting encoded token data', () => {
  const tokenAddress = '0x0b1ba0af832d7c05fd64161e0db78e85978e8082';
  const expectedEncodedData =
    '0xf47261b00000000000000000000000000b1ba0af832d7c05fd64161e0db78e85978e8082';
  const testToken = new Token('Test Token A', tokenAddress);
  assert.equal(testToken.getEncodedTokenData(), expectedEncodedData);
});
