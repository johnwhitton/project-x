import {ContractWrappers} from './ContractWrappers';
import {ContractWrappers as ZeroExContractWrappers} from '0x.js';
import {ProviderEngine} from '../providerEngine/ProviderEngine';

export class ZeroExContractWrapper extends ContractWrappers {
  constructor(providerEngine) {
    this.zeroExContractWrapper = ZeroExContractWrappers(providerEngine, {networkId: 50});
  }

  setUnlimitedProxyAllowanceAsync = async (tokenAddress, userAddress) => {
    const approvalHash = await this.zeroExContractWrapper.erc20Token.setUnlimitedProxyAllowanceAsync(tokenAddress, userAddress);
    return approvalHash;
  }

  validateFillOrderThrowIfInvalidAsync = async (signedOrder, takerAssetAmount, takerAddress) => {
    await this.zeroExContractWrapper.exchange.validateFillOrderThrowIfInvalidAsync(signedOrder, takerAssetAmount, takerAddress);
  }
}
