import {assert} from 'chai';
import {CowriProvider} from '../CowriProvider';
import {Token} from '../../Token';

it('Test general', async () => {
  const provider = new CowriProvider();
  const tokenToSend = new Token(
    'USDA',
    '0x802804f1eb96Fcf3802FceDF6648F55Ddae95208'.toLowerCase(),
    0.000003,
  );
  const tokenToReceive = new Token(
    'USDB',
    '0xAd31dA2bfd3113394745954445359caacb54BFef'.toLowerCase(),
    0.000004,
  );
  const senderAddress = '0x141cc50934F7911D7f85051A7F3C14c70b6BcE3C'.toLowerCase();
  const receiverAddress = '0xB4187986Be998b5BA92f5c8fCd36d13fF5136D80'.toLowerCase();
  const signedOrder = await provider.swapToken(
    tokenToSend,
    tokenToReceive,
    senderAddress,
    receiverAddress,
  );
  provider.fillSwap(
    signedOrder,
    receiverAddress,
    tokenToReceive.toBaseUnitAmount(),
  );
  console.log(await provider.getTokenBalances());
});
