import {CowriUser} from '../main/CowriUser';
import {Token} from '../main/Token';
import {CowriShell} from '../main/CowriShell';
import {assert} from 'chai';

it ('Test the TransactionProtocol constructor', () => {
  let cowriShell = buildCowriShell();
  let cowriUser = new CowriUser('cowriUser', cowriShell);
  assert.equal(cowriShell, cowriUser.cowriShell);
});

let buildCowriShell = () => {
  let tokenA = new Token("TokenA", "123", 100);
  let tokenB = new Token("TokenB", "abc", 200);
  let tokenC = new Token("TokenC", "ik998df9", 300);
  let tokenD = new Token("TokenD", "98dfkj", 400);
  return new CowriShell([tokenA, tokenB, tokenC, tokenD]);
}
