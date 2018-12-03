import {TokenSwapOrder} from '../TokenSwapOrder';
import {assert} from 'chai';
import {Token} from '../Token';
import {CowriShell} from '../CowriShell';
import {CowriUser} from '../CowriUser';

it ('Test the TokenSwapOrder constructor', () => {
  const senderToken = buildSenderToken();
  const receiverToken = buildReceiverToken();
  const senderCowriShell = new CowriShell([senderToken]);
  const receiverCowriShell = new CowriShell([receiverToken]);
  const senderCowriUser = new CowriUser("senderUserAddress", senderCowriShell);
  const receiverCowriUser = new CowriUser("receiverUserAddress", receiverCowriShell);
  const testTokenSwapOrder = new TokenSwapOrder(senderToken, senderCowriUser, receiverToken, receiverCowriUser);
  console.log(testTokenSwapOrder.generateOrder());
});

let buildSenderToken = () => {
  return new Token("senderToken", "senderTokenAddress", 15);
}

let buildReceiverToken = () => {
  return new Token("receiverToken", "receiverTokenAddress", 20);
}
