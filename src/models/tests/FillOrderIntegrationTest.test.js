import {
  assetDataUtils,
  BigNumber,
  ContractWrappers,
  generatePseudoRandomSalt,
  Order,
  orderHashUtils,
  signatureUtils
} from '0x.js';
import { Web3Wrapper } from '@0x/web3-wrapper';
import { getContractAddressesForNetworkOrThrow } from '@0x/contract-addresses';
import {RPCSubprovider, Web3ProviderEngine } from '0x.js';

it ('Test the end-to-end process of signing a transaction', async () => {
  const NULL_ADDRESS = '0x0000000000000000000000000000000000000000';
  const ZERO = new BigNumber(0);
  const providerEngine = new Web3ProviderEngine();
  providerEngine.addProvider(new RPCSubprovider('http://localhost:8545'));
  providerEngine.start();
  const contractWrappers = new ContractWrappers(providerEngine, { networkId: 50 });

  const web3Wrapper = new Web3Wrapper(providerEngine);
  const [maker, taker] = await web3Wrapper.getAvailableAddressesAsync();

  //const makerAddress = '0x5409ed021d9299bf6814279a61411a7e866a631';
  //const takerAddress = '0x6ecbe1db9ef729cbe972c83fb886247691fb6beb';
  const contractAddresses = getContractAddressesForNetworkOrThrow(50);
  const zrxTokenAddress = contractAddresses.zrxToken;
  const etherTokenAddress = contractAddresses.etherToken;
  const DECIMALS = 18;

  const makerAssetData = assetDataUtils.encodeERC20AssetData(zrxTokenAddress);
  const takerAssetData = assetDataUtils.encodeERC20AssetData(etherTokenAddress);

  // the amount the maker is selling of maker asset
  const makerAssetAmount = Web3Wrapper.toBaseUnitAmount(new BigNumber(5), DECIMALS);
  // the amount the maker wants of taker asset
  const takerAssetAmount = Web3Wrapper.toBaseUnitAmount(new BigNumber(0.1), DECIMALS);
  const makerZRXApprovalTxHash = await contractWrappers.erc20Token.setUnlimitedProxyAllowanceAsync(
        zrxTokenAddress,
        maker,

  );
  await web3Wrapper.awaitTransactionSuccessAsync(makerZRXApprovalTxHash);
  const takerWETHApprovalTxHash = await contractWrappers.erc20Token.setUnlimitedProxyAllowanceAsync(
        etherTokenAddress,
        taker,

  );
  await web3Wrapper.awaitTransactionSuccessAsync(takerWETHApprovalTxHash);

  const takerWETHDepositTxHash = await contractWrappers.etherToken.depositAsync(
        etherTokenAddress,
        takerAssetAmount,
        taker,

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
        salt: generatePseudoRandomSalt(),
        makerAssetAmount,
        takerAssetAmount,
        makerAssetData,
        takerAssetData,
        makerFee: ZERO,
        takerFee: ZERO,
  };

  const orderHashHex = orderHashUtils.getOrderHashHex(order);

  const signature = await signatureUtils.ecSignHashAsync(providerEngine, orderHashHex, maker);
  const signedOrder = { ...order, signature  };

  await contractWrappers.exchange.validateFillOrderThrowIfInvalidAsync(signedOrder, takerAssetAmount, taker);
  console.log('Did it freaking finish? Jeez');
});

