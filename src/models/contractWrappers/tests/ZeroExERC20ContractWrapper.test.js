import {assert} from 'chai';
import {ZeroExERC20ContractWrapper} from '../ZeroExERC20ContractWrapper';
import {ContractWrappers} from '../ContractWrappers';
import {BigNumber} from '0x.js';
import {Web3ProviderEngine} from '../../providerEngine/Web3ProviderEngine';
import {ZERO, GANACHE_NETWORK_ID, RPC_URL} from '../../Constants';
import {RPCSubprovider} from '../../subProviders/RPCSubprovider';
import {Token} from '../../Token';
import {CowriUser} from '../../CowriUser';
import {TokenSwapOrder} from '../../orders/TokenSwapOrder';

it('Test the ZeroExERC20ContractWrapper constructor without passing arguments', () => {
  assert.throw(() => new ZeroExERC20ContractWrapper());
});

it('Test the ZeroExERC20ContractWrapper constructor', () => {
  const providerEngine = new Web3ProviderEngine();
  providerEngine.addProvider(new RPCSubprovider(RPC_URL).getSubprovider());
  providerEngine.start();
  const contractWrappers = new ZeroExERC20ContractWrapper(
    providerEngine.getEngine(),
    {networkId: GANACHE_NETWORK_ID},
  );
  assert.isOk(contractWrappers);
});

it('Test setUnlimitedProxyAllowanceAsync', async () => {
  const tokenAddress = '0x871dd7c2b4b25e1aa18728e9d5f2af4c4e431f5c';
  const userAddress = '0x5409ed021d9299bf6814279a6a1411a7e866a631';
  const providerEngine = new Web3ProviderEngine();
  providerEngine.addProvider(new RPCSubprovider(RPC_URL).getSubprovider());
  providerEngine.start();
  const contractWrappers = new ZeroExERC20ContractWrapper(
    providerEngine.getEngine(),
    {networkId: GANACHE_NETWORK_ID},
  );
  //The hash it returns is unique every time. Testing that it's not a falsy
  assert.isOk(
    await contractWrappers.setUnlimitedProxyAllowanceAsync(
      tokenAddress,
      userAddress,
    ),
  );
});

it('Test validateFillOrderThrowIfInvalidAsync', async () => {
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
  await tokenSwapOrder.signOrderAsync();

  const providerEngine = new Web3ProviderEngine();
  providerEngine.addProvider(new RPCSubprovider(RPC_URL).getSubprovider());
  providerEngine.start();
  const contractWrappers = new ZeroExERC20ContractWrapper(
    providerEngine.getEngine(),
    {networkId: GANACHE_NETWORK_ID},
  );
  //This will throw if invalid. We expect it to be valid here.
  await contractWrappers.validateFillOrderThrowIfInvalidAsync(
    tokenSwapOrder.order,
    zrxToken.toBaseUnitAmount(),
    receiverAddress,
  );
  //This invalidates the order.
  tokenSwapOrder.order.signature = 'dfsdfasdf';
  //I couldn't think of a more elegant way to test this :( suggestions appreciated.
  try {
    await contractWrappers.validateFillOrderThrowIfInvalidAsync(
      tokenSwapOrder.order,
      zrxToken.toBaseUnitAmount(),
      receiverAddress,
    );
  } catch (err) {
    return;
  }
  assert.fail('fillOrderThrowIfInvalid did not throw an invalid order');
});

it('Test getBalanceAsync', async () => {
  const tokenAddress = '0x0b1ba0af832d7c05fd64161e0db78e85978e8082';
  const tokenName = 'etherToken';
  const userAddress = '0x5409ed021d9299bf6814279a6a1411a7e866a631';
  const token = new Token(tokenName, tokenAddress);
  const cowriUser = new CowriUser(userAddress, null);
  const providerEngine = new Web3ProviderEngine();
  providerEngine.addProvider(new RPCSubprovider(RPC_URL).getSubprovider());
  providerEngine.start();
  const contractWrappers = new ZeroExERC20ContractWrapper(
    providerEngine.getEngine(),
    {networkId: GANACHE_NETWORK_ID},
  );
  assert.isOk(await contractWrappers.getBalanceAsync(cowriUser, token));
});

it('Test depositEtherAsync', async () => {
  const tokenAddress = '0x0b1ba0af832d7c05fd64161e0db78e85978e8082';
  const assetAmount = new BigNumber('100000000000000000');
  const etherToken = new Token('etherToken', tokenAddress, 20);
  const userAddress = '0x5409ed021d9299bf6814279a6a1411a7e866a631';
  const providerEngine = new Web3ProviderEngine();
  providerEngine.addProvider(new RPCSubprovider(RPC_URL).getSubprovider());
  providerEngine.start();
  const contractWrappers = new ZeroExERC20ContractWrapper(
    providerEngine.getEngine(),
    {networkId: GANACHE_NETWORK_ID},
  );
  //Again, the returned hash is unique every time.
  contractWrappers.depositEtherAsync(etherToken, userAddress);
  assert.isOk(
    await contractWrappers.depositEtherAsync(etherToken, userAddress),
  );
});
