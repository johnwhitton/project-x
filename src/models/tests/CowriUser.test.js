import {assert} from 'chai';
import {CowriUser} from '../CowriUser';
import {CowriShell} from '../CowriShell';
import {Token} from '../Token';

it('Test CowriUser constructor', () => {
  const tokenArray = [new Token('tokenA', 'tknA')];
  const cowriShell = new CowriShell(tokenArray);
  const cowriUser = new CowriUser('testPublicKey', cowriShell);
  assert.equal(cowriShell, cowriUser.cowriShell);
  assert.equal('testPublicKey', cowriUser.address);
});
