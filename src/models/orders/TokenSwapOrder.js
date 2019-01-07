import {Order} from './Order';
import {CowriUser} from '../CowriUser';
import {Token} from '../Token';
import {Web3ProviderEngine} from '../providerEngine/Web3ProviderEngine';
import {RPCSubprovider} from '../subProviders/RPCSubprovider';
import {
  RPC_URL,
  GANACHE_NETWORK_ID,
  ZeroExExchangeAddress,
  NULL_ADDRESS,
} from '../Constants';
import {ZeroExERC20ContractWrapper} from '../contractWrappers/ZeroExERC20ContractWrapper';
import {Web3Provider} from '../providers/Web3Provider';
import {generateRandom256Salt, getFutureExpiration} from '../../utils/utils';
import {getOrderHashHex} from '../../utils/OrderHashUtils';
import {ecSignHashAsync} from '../../utils/SignatureUtils';

export class TokenSwapOrder extends Order {
  constructor(makerCowriUser, tokenToSell, takerCowriUser, tokenToBuy) {
    super();
    this.makerCowriUser = makerCowriUser;
    this.tokenToSell = tokenToSell;
    this.takerCowriUser = takerCowriUser;
    this.tokenToBuy = tokenToBuy;

    this.providerEngine = new Web3ProviderEngine();
    this.providerEngine.addProvider(
      new RPCSubprovider(RPC_URL).getSubprovider(),
    );
    this.providerEngine.start();

    this.contractWrappers = new ZeroExERC20ContractWrapper(
      this.providerEngine.getEngine(),
      {networkId: GANACHE_NETWORK_ID},
    );
    this.web3Wrapper = new Web3Provider(this.providerEngine.getEngine());
    this.makerAssetAmount = this.tokenToSell.toBaseUnitAmount();
    this.takerAssetAmount = this.tokenToBuy.toBaseUnitAmount();
    this.order = {
      exchangeAddress: ZeroExExchangeAddress,
      makerAddress: this.makerCowriUser.address,
      takerAddress: NULL_ADDRESS,
      senderAddress: NULL_ADDRESS,
      feeRecipientAddress: NULL_ADDRESS,
      expirationTimeSeconds: getFutureExpiration(),
      salt: generateRandom256Salt(),
      makerAssetAmount: this.makerAssetAmount,
      takerAssetAmount: this.takerAssetAmount,
      makerAssetData: this.tokenToSell.getEncodedTokenData(),
      takerAssetData: this.tokenToBuy.getEncodedTokenData(),
      makerFee: '0',
      takerFee: '0',
    };
  }

  isValidAsync = async () => {
    try {
      await this.contractWrappers.validateFillOrderThrowIfInvalidAsync(
        this.order,
        this.takerAssetAmount,
        this.takerCowriUser.address,
      );
      return true;
    } catch (err) {
      console.log('order is invalid. ' + err);
      return false;
    }
  };

  setUnlimitedProxyAllowanceAsync = async () => {
    const makerApprovalTxHash = await this.contractWrappers.setUnlimitedProxyAllowanceAsync(
      this.tokenToSell.address,
      this.makerCowriUser.address,
    );
    await this.web3Wrapper.awaitTransactionSuccessAsync(makerApprovalTxHash);

    const takerApprovalTxHash = await this.contractWrappers.setUnlimitedProxyAllowanceAsync(
      this.tokenToBuy.address,
      this.takerCowriUser.address,
    );
    await this.web3Wrapper.awaitTransactionSuccessAsync(takerApprovalTxHash);
  };

  signOrderAsync = async () => {
    const orderHashHex = getOrderHashHex(this.order);
    const signature = await ecSignHashAsync(
      this.providerEngine.getEngine(),
      orderHashHex,
      this.makerCowriUser.address,
    );
    this.order = {...this.order, signature};
  };

  fillOrderAsync = async () => {
    if (!this.order.signature) {
      throw new Error('Order must be signed before submission');
    }
    const txHash = await this.contractWrappers.fillOrderAsync(
      this.order,
      this.takerAssetAmount,
      this.takerCowriUser.address,
      {gasLimit: 10000000},
    );
    await this.web3Wrapper.awaitTransactionSuccessAsync(txHash);
  };
}
