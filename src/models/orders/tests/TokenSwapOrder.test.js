import {assert} from 'chai';
import {TokenSwapOrder} from '../TokenSwapOrder';
import {CowriUser} from '../../CowriUser';
import {Token} from '../../Token';

it('Test the TokenSwapOrder constructor', async () => {
  const zrxTokenName = 'zrxToken';
  const etherTokenName = 'ethToken';
  const zrxTokenAddress = '0x871dd7c2b4b25e1aa18728e9d5f2af4c4e431f5c';
  const etherTokenAddress = '0x0b1ba0af832d7c05fd64161e0db78e85978e8082';
  const senderAddress = '0x5409ed021d9299bf6814279a6a1411a7e866a631';
  const receiverAddress = '0x6ecbe1db9ef729cbe972c83fb886247691fb6beb';
  const zrxToken = new Token(zrxTokenName, zrxTokenAddress, 5);
  const etherToken = new Token(etherTokenName, etherTokenAddress, 0.1);
  const senderCowriUser = new CowriUser(senderAddress, null);
  const receiverCowriUser = new CowriUser(receiverAddress, null);
  const tokenSwapOrder = new TokenSwapOrder(
    senderCowriUser,
    zrxToken,
    receiverCowriUser,
    etherToken,
  );
  await tokenSwapOrder.setUnlimitedProxyAllowanceAsync();
  await tokenSwapOrder.signOrderAsync();
  await tokenSwapOrder.fillOrderAsync();
});
