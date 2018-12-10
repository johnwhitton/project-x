import {assert} from 'chai';
import {RPCSubProvider} from '../subProviders/RPCSubProvider';
import {MnemonicWalletSubProvider} from '../subProviders/MnemonicWalletSubProvider';
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
  providerEngine.addProvider(new RPCSubProvider('http://127.0.0.1:8545'));
  providerEngine.addProvider(new MnemonicWalletSubProvider());
  providerEngine.start();

  // Instantiate ContractWrappers with the provider
  const contractWrappers = new ZeroExContractWrapper(providerEngine.web3ProviderEngine);
  const web3Wrapper = new Web3Provider(providerEngine.web3ProviderEngine);
  console.log(await web3Wrapper.getAvailableAddressesAsync());
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

  const makerZRXApprovalTxHash = ZeroExContractWrapper.setUnlimitedProxyAllowanceAsync(
        zrxTokenAddress,
        makerAddress
  );
  web3Wrapper.awaitTransactionSuccessAsync(makerZRXApprovalTxHash);

  const takerWETHApprovalTxHash = ZeroExContractWrapper.setUnlimitedProxyAllowanceAsync(
        etherTokenAddress,
        takerAddress
  );
  web3Wrapper.awaitTransactionSuccessAsync(takerWETHApprovalTxHash);

  const takerWETHDepositTxHash = contractWrappers.etherToken.depositAsync(
        etherTokenAddress,
        takerAssetAmount,
        takerAddress
  );

  web3Wrapper.awaitTransactionSuccessAsync(takerWETHDepositTxHash);

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

  const signature = ecSignHashAsync(providerEngine, orderHashHex, makerAddress);
  const signedOrder = { ...order, signature  };

  contractWrappers.validateFillOrderThrowIfInvalidAsync(signedOrder, takerAssetAmount, takerAddress);
});

