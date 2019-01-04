import {assert} from 'chai';
import {Token} from '../Token';

it('Test the constructor of the Token', () => {
  const testToken = new Token('Test Token A', 'tokenaddress');
  assert.equal('Test Token A', testToken.name);
  assert.equal('tokenaddress', testToken.address);
  assert.equal(0, testToken.balance);
  assert.equal(18, testToken.decimals);
});
