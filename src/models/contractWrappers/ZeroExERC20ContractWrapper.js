import {ContractWrappers} from './ContractWrappers';
import {ContractWrappers as ZeroExContractWrappers} from '0x.js';
import {ProviderEngine} from '../providerEngine/ProviderEngine';

export class ZeroExERC20ContractWrapper extends ContractWrappers {
  constructor(providerEngine, config) {
    if (!providerEngine)
      throw new Error('providerEngine must be passed in constructor');
    super();
    this.zeroExContractWrapper = new ZeroExContractWrappers(
      providerEngine,
      config,
    );
  }

  setUnlimitedProxyAllowanceAsync = async (tokenAddress, userAddress) => {
    const approvalHash = await this.zeroExContractWrapper.erc20Token.setUnlimitedProxyAllowanceAsync(
      tokenAddress,
      userAddress,
    );
    return approvalHash;
  };

  validateFillOrderThrowIfInvalidAsync = async (
    signedOrder,
    takerAssetAmount,
    takerAddress,
  ) => {
    await this.zeroExContractWrapper.exchange.validateFillOrderThrowIfInvalidAsync(
      signedOrder,
      takerAssetAmount,
      takerAddress,
    );
  };

  fillOrderAsync = async (signedOrder, takerAssetAmount, taker, config) => {
    const txHash = await this.zeroExContractWrapper.exchange.fillOrderAsync(
      signedOrder,
      takerAssetAmount,
      taker,
      config,
    );
    return txHash;
  };

  depositEtherAsync = async (tokenAddress, assetAmount, userAddress) => {
    const depositTxHash = await this.zeroExContractWrapper.etherToken.depositAsync(
      tokenAddress,
      assetAmount,
      userAddress,
    );
    return depositTxHash;
  };

  getBalanceAsync = async (cowriUser, token) => {
    const ownerAddress = cowriUser.address;
    const tokenAddress = token.address;
    return await this.zeroExContractWrapper.erc20Token.getBalanceAsync(
      tokenAddress,
      ownerAddress,
    );
  };
}
