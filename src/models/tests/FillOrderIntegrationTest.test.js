import {assert} from 'chai';
import {RPCSubProvider} from '../subProviders/RPCSubProvider';
import {Web3ProviderEngine} from '../providerEngine/Web3ProviderEngine';
import {ZeroExContractWrapper} from '../contractWrappers/ZeroExContractWrapper';
import {Web3Provider} from '../providers/Web3Provider.js';
import {ZeroExContractAddresses} from '../contractAddresses/ZeroExContractAddresses';
import {encodeERC20AssetData} from '../../utils/AssetDataUtils';
import {getOrderHashHex} from '../../utils/OrderHashUtils';
import {convertValueToTokenDecimals, generateRandom256Salt} from '../../utils/utils';
import {ecSignHashAsync} from '../../utils/SignatureUtils';

it ('Test the end-to-end process of signing a transaction', async () => {
  const providerEngine = new Web3ProviderEngine();
  providerEngine.addProvider(new RPCSubProvider('http://localhost:8545'));
  providerEngine.start();
  // Instantiate ContractWrappers with the provider
  const contractWrappers = new ZeroExContractWrapper(providerEngine);
  console.log('got this far');
  const web3Wrapper = new Web3Provider(providerEngine);
  const [makerAddress, takerAddress] = web3Wrapper.getAvailableAddressesAsync();

  const contractAddresses = ZeroExContractAddresses.getContractAddressesForNetworkOrThrow();
  const zrxTokenAddress = contractAddresses.zrxToken;
  const etherTokenAddress = contractAddresses.etherToken;
  const DECIMALS = 18;

  const makerAssetData = encodeERC20AssetData(zrxTokenAddress);
  const takerAssetData = encodeERC20AssetData(etherTokenAddress);

  // the amount the maker is selling of maker asset
  const makerAssetAmount = convertValueToTokenDecimals(5, DECIMALS);
  // the amount the maker wants of taker asset
  const takerAssetAmount = convertValueToTokenDecimals(0.1, DECIMALS);

  const makerZRXApprovalTxHash = await ZeroExContractWrapper.setUnlimitedProxyAllowanceAsync(
        zrxTokenAddress,
        makerAddress
  );
  await web3Wrapper.awaitTransactionSuccessAsync(makerZRXApprovalTxHash);

  const takerWETHApprovalTxHash = await ZeroExContractWrapper.setUnlimitedProxyAllowanceAsync(
        etherTokenAddress,
        takerAddress
  );
  await web3Wrapper.awaitTransactionSuccessAsync(takerWETHApprovalTxHash);

  const takerWETHDepositTxHash = await contractWrappers.etherToken.depositAsync(
        etherTokenAddress,
        takerAssetAmount,
        takerAddress
  );

  await web3Wrapper.awaitTransactionSuccessAsync(takerWETHDepositTxHash);

  const ExpirationTimeInSeconds = +Date.now() + 3600000;
  const randomExpiration = ExpirationTimeInSeconds;
  const exchangeAddress = contractAddresses.exchange;

  const order = {
        exchangeAddress,
        makerAddress: makerAddress,
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
        takerFee: ZERO
  };

  const orderHashHex = getOrderHashHex(order);

  const signature = await ecSignHashAsync(providerEngine, orderHashHex, makerAddress);
  const signedOrder = { ...order, signature  };

  await contractWrappers.validateFillOrderThrowIfInvalidAsync(signedOrder, takerAssetAmount, takerAddress);
});

