import {assert} from 'chai';
import {ZeroExERC20ContractWrapper} from '../ZeroExERC20ContractWrapper';
import {ContractWrappers} from '../ContractWrappers';
import {BigNumber} from '0x.js';
import {Web3ProviderEngine} from '../../providerEngine/Web3ProviderEngine';
import {ZERO, GANACHE_NETWORK_ID, RPC_URL} from '../../Constants';
import {RPCSubprovider} from '../../subProviders/RPCSubprovider';

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

it('Test validateFillOrderThrowIfInvalidAsync', () => {
  assert.fail('Figure out a good way to test this.');
});

it('Test depositEtherAsync', async () => {
  const tokenAddress = '0x0b1ba0af832d7c05fd64161e0db78e85978e8082';
  const assetAmount = new BigNumber('100000000000000000');
  const userAddress = '0x5409ed021d9299bf6814279a6a1411a7e866a631';
  const providerEngine = new Web3ProviderEngine();
  providerEngine.addProvider(new RPCSubprovider(RPC_URL).getSubprovider());
  providerEngine.start();
  const contractWrappers = new ZeroExERC20ContractWrapper(
    providerEngine.getEngine(),
    {networkId: GANACHE_NETWORK_ID},
  );
  //Again, the returned hash is unique every time.
  assert.isOk(
    await contractWrappers.depositEtherAsync(
      tokenAddress,
      assetAmount,
      userAddress,
    ),
  );
});
