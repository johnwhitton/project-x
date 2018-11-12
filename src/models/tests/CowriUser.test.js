import {assert} from 'chai';
import {CowriUser} from '../CowriUser';
import {CowriShell} from '../CowriShell';
import {Token} from '../Token';

it ('Test CowriUser constructor', () => {
  let tokenArray = [new Token('tokenA', 'tknA')];
  let cowriShell = new CowriShell(tokenArray);
  let cowriUser = new CowriUser('testPublicKey', cowriShell);
  assert.equal(cowriShell, cowriUser.cowriShell);
  assert.equal('testPublicKey', cowriUser.address);
});
