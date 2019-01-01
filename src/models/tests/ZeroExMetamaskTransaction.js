import {TokenSwapOrder} from '../TokenSwapOrder';
import {assert} from 'chai';
import {Token} from '../Token';
import {CowriShell} from '../CowriShell';
import {CowriUser} from '../CowriUser';

export class ZeroExMetamaskTransaction {

  constructor() {
    this.senderToken = this.buildSenderToken();
    this.receiverToken = this.buildReceiverToken();
    this.senderCowriShell = new CowriShell([this.senderToken]);
    this.receiverCowriShell = new CowriShell([this.receiverToken]);
    this.senderCowriUser = new CowriUser("0x141cc50934F7911D7f85051A7F3C14c70b6BcE3C", this.senderCowriShell);
    this.receiverCowriUser = new CowriUser("0xB4187986Be998b5BA92f5c8fCd36d13fF5136D80", this.receiverCowriShell);
    this.testTokenSwapOrder = new TokenSwapOrder(this.senderToken, this.senderCowriUser, this.receiverToken, this.receiverCowriUser);
  }

  buildSenderToken = () => {
    return new Token("USDA", "0x802804f1eb96fcf3802fcedf6648f55ddae95208", 15);
  }

  buildReceiverToken = () => {
    return new Token("USDB", "0xad31da2bfd3113394745954445359caacb54bfef", 20);
  }

  generateOrder = () => {
    return this.testTokenSwapOrder.generateOrder();
  }
}

