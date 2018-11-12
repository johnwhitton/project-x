import {assert} from 'chai';
import {CowriUser} from '../main/CowriUser';
import {CowriShell} from '../main/CowriShell';
import {Token} from '../main/Token';

it ('Test CowriUser constructor', () => {
  let tokenArray = [new Token('tokenA', 'tknA')];
  let cowriShell = new CowriShell(tokenArray);
  let cowriUser = new CowriUser('testPublicKey', cowriShell);
  assert.equal(cowriShell, cowriUser.cowriShell);
  assert.equal('testPublicKey', cowriUser.address);
});
