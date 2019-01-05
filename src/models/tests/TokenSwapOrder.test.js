import {assert} from 'chai';
import {TokenSwapOrder} from '../TokenSwapOrder';
import {Token} from '../Token';
import {CowriShell} from '../CowriShell';
import {CowriUser} from '../CowriUser';

it('Test the TokenSwapOrder constructor', () => {
  const senderToken = new Token('senderToken', 'senderTokenAddress', 15);
  const receiverToken = new Token('receiverToken', 'receiverTokenAddress', 20);
  const senderCowriShell = new CowriShell([senderToken]);
  const receiverCowriShell = new CowriShell([receiverToken]);
  const senderCowriUser = new CowriUser('senderUserAddress', senderCowriShell);
  const receiverCowriUser = new CowriUser(
    'receiverUserAddress',
    receiverCowriShell,
  );
  const testTokenSwapOrder = new TokenSwapOrder(
    senderToken,
    senderCowriUser,
    receiverToken,
    receiverCowriUser,
  );
  assert.isOk(testTokenSwapOrder);
});
