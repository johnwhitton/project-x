import {assert} from 'chai';
import {CowriUser} from '../CowriUser';
import {Token} from '../Token';
import {CowriShell} from '../CowriShell';

it('Test the TransactionProtocol constructor', () => {
  const cowriShell = buildCowriShell();
  const cowriUser = new CowriUser('cowriUser', cowriShell);
  assert.equal(cowriShell, cowriUser.cowriShell);
});

let buildCowriShell = () => {
  const tokenA = new Token('TokenA', '123', 100);
  const tokenB = new Token('TokenB', 'abc', 200);
  const tokenC = new Token('TokenC', 'ik998df9', 300);
  const tokenD = new Token('TokenD', '98dfkj', 400);
  return new CowriShell([tokenA, tokenB, tokenC, tokenD]);
};
