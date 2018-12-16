import {
  BigNumber,
  Order,
  orderHashUtils,
  signatureUtils
} from '0x.js';
import { Web3Wrapper } from '@0x/web3-wrapper';
import { RPCSubprovider } from '../subProviders/RPCSubprovider';
import { encodeERC20AssetData } from '../../utils/AssetDataUtils';
import { NULL_ADDRESS, DECIMALS, GANACHE_NETWORK_ID, RPC_URL } from '../Constants';
import { ZERO } from '../../utils/math/CowriMath';
import { generateRandom256Salt } from '../../utils/utils';
import { Web3ProviderEngine } from '../providerEngine/Web3ProviderEngine';
import { ZeroExERC20ContractWrapper } from '../contractWrappers/ZeroExERC20ContractWrapper';
import { ZeroExContractAddresses } from '../contractAddresses/ZeroExContractAddresses';

it ('Test the end-to-end process of signing a transaction', async () => {

  const providerEngine = new Web3ProviderEngine();
  providerEngine.addProvider(new RPCSubprovider(RPC_URL).getSubprovider());
  providerEngine.start();
  const contractWrappers = new ZeroExERC20ContractWrapper(providerEngine.getEngine(), { networkId: GANACHE_NETWORK_ID });

  const web3Wrapper = new Web3Wrapper(providerEngine.getEngine());
  const [maker, taker] = await web3Wrapper.getAvailableAddressesAsync();

  const zeroExContractAddresses = new ZeroExContractAddresses();
  const contractAddresses = zeroExContractAddresses.getContractAddressesForNetworkOrThrow(GANACHE_NETWORK_ID);
  const zrxTokenAddress = contractAddresses.zrxToken;
  const etherTokenAddress = contractAddresses.etherToken;

  const makerAssetData = encodeERC20AssetData(zrxTokenAddress);
  const takerAssetData = encodeERC20AssetData(etherTokenAddress);

  // the amount the maker is selling of maker asset
  const makerAssetAmount = Web3Wrapper.toBaseUnitAmount(new BigNumber(5), DECIMALS);
  // the amount the maker wants of taker asset
  const takerAssetAmount = Web3Wrapper.toBaseUnitAmount(new BigNumber(0.1), DECIMALS);
  const makerZRXApprovalTxHash = await contractWrappers.setUnlimitedProxyAllowanceAsync(
        zrxTokenAddress,
        maker
  );

  await web3Wrapper.awaitTransactionSuccessAsync(makerZRXApprovalTxHash);
  const takerWETHApprovalTxHash = await contractWrappers.setUnlimitedProxyAllowanceAsync(
        etherTokenAddress,
        taker
  );

  await web3Wrapper.awaitTransactionSuccessAsync(takerWETHApprovalTxHash);

  const takerWETHDepositTxHash = await contractWrappers.depositEtherAsync(
        etherTokenAddress,
        takerAssetAmount,
        taker
  );

  await web3Wrapper.awaitTransactionSuccessAsync(takerWETHDepositTxHash);

  const randomExpiration = new BigNumber(Date.now() + 600000).ceil();
  const exchangeAddress = contractAddresses.exchange;

  const order: Order = {
        exchangeAddress,
        makerAddress: maker,
        takerAddress: NULL_ADDRESS,
        senderAddress: NULL_ADDRESS,
        feeRecipientAddress: NULL_ADDRESS,
        expirationTimeSeconds: randomExpiration,
        salt: generateRandom256Salt(),
        makerAssetAmount,
        takerAssetAmount,
        makerAssetData,
        takerAssetData,
        makerFee: ZERO,
        takerFee: ZERO,
  };

  const orderHashHex = orderHashUtils.getOrderHashHex(order);

  const signature = await signatureUtils.ecSignHashAsync(providerEngine.getEngine(), orderHashHex, maker);
  const signedOrder = { ...order, signature  };

  await contractWrappers.validateFillOrderThrowIfInvalidAsync(signedOrder, takerAssetAmount, taker);
  console.log('Did it freaking finish? Jeez');
});

