import {Token} from '../main/Token';
import {assert} from 'chai';

it('Test the constructor of the Token', () => {
  let testToken = new Token('Test Token A', 'tokenaddress');
  assert.equal('Test Token A', testToken.name);
  assert.equal('tokenaddress', testToken.address);
  assert.equal(+0, testToken.balance);
  assert.equal(+18, testToken.decimals);
});

