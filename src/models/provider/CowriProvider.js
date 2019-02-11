import {
  BigNumber,
  ContractWrappers,
  generatePseudoRandomSalt,
  signatureUtils,
  Web3ProviderEngine,
  RPCSubprovider,
} from '0x.js';
import {getContractAddressesForNetworkOrThrow} from '@0x/contract-addresses';
import {Web3Wrapper} from '@0x/web3-wrapper';

import {Provider} from './Provider';
import ABI from '../../ABI';
import ShellABI from '../../ShellABI';
import AxiosRequest from '../request/axiosRequest';
import * as credentials from '../../../config/parityPassword.json';
import {
  DECIMALS,
  KOVAN_NETWORK_ID,
  RPC_URL,
  SHELL_MAPPING_CONTRACT_ADDRESS,
  NULL_ADDRESS,
} from '../Constants';
import {getFutureExpiration} from '../../utils/utils';

export default class CowriProvider extends Provider {
  constructor() {
    super();
    const Web3 = require('web3');
    this.web3 = new Web3(RPC_URL);
    this.providerEngine = new Web3ProviderEngine();
    this.providerEngine.addProvider(new RPCSubprovider(RPC_URL));
    this.providerEngine.start();
    this.web3Wrapper = new Web3Wrapper(this.providerEngine);
    this.contractWrappers = new ContractWrappers(this.providerEngine, {
      networkId: KOVAN_NETWORK_ID,
    });
    this.request = new AxiosRequest();
  }

  sendToken = async (senderAddress, receiverAddress, token) => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000000;
    await this.unlockAccount(senderAddress);
    const tokenContract = await new this.web3.eth.Contract(
      ShellABI,
      token.address,
    );
    await tokenContract.methods
      .transfer(receiverAddress, '' + token.toBaseUnitAmount())
      .send({from: senderAddress});
  };

  swapToken = async (
    tokenToSend,
    tokenToReceive,
    senderAddress,
    receiverAddress,
  ) => {
    const contractAddresses = getContractAddressesForNetworkOrThrow(
      KOVAN_NETWORK_ID,
    );
    const exchangeAddress = contractAddresses.exchange;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000000;

    const order = {
      exchangeAddress,
      makerAddress: senderAddress,
      takerAddress: NULL_ADDRESS,
      senderAddress: NULL_ADDRESS,
      feeRecipientAddress: NULL_ADDRESS,
      expirationTimeSeconds: getFutureExpiration(),
      salt: generatePseudoRandomSalt(),
      makerAssetAmount: tokenToSend.toBaseUnitAmount(),
      takerAssetAmount: tokenToReceive.toBaseUnitAmount(),
      makerAssetData: tokenToSend.getEncodedTokenData(),
      takerAssetData: tokenToReceive.getEncodedTokenData(),
      makerFee: new BigNumber(0),
      takerFee: new BigNumber(0),
    };
    await this.unlockAccount(senderAddress);
    await this.unlockAccount(receiverAddress);
    const makerApprovalTxHash = await this.contractWrappers.erc20Token.setUnlimitedProxyAllowanceAsync(
      tokenToSend.address,
      senderAddress,
    );
    const takerApprovalTxHash = await this.contractWrappers.erc20Token.setUnlimitedProxyAllowanceAsync(
      tokenToReceive.address,
      receiverAddress,
    );
    await Promise.all([
      this.web3Wrapper.awaitTransactionSuccessAsync(makerApprovalTxHash),
      this.web3Wrapper.awaitTransactionSuccessAsync(takerApprovalTxHash),
    ]);
    await this.unlockAccount(senderAddress);
    await this.unlockAccount(receiverAddress);
    const signedOrder = await this.signOrder(order, senderAddress);
    await this.contractWrappers.exchange.validateOrderFillableOrThrowAsync(
      signedOrder,
    );
    return signedOrder;
  };

  unlockAccount = async accountPublicKey => {
    const params = [accountPublicKey, credentials.password, null];
    const rawRequest = {
      method: 'personal_unlockAccount',
      params,
      id: 1,
      jsonrpc: '2.0',
    };
    await this.request.postAsync(
      RPC_URL,
      JSON.stringify(rawRequest),
      res => res,
    );
  };

  fillSwap = async (signedOrder, takerAddress, takerAssetAmount) => {
    const txHash = await this.contractWrappers.exchange.fillOrderAsync(
      signedOrder,
      new BigNumber(takerAssetAmount),
      takerAddress,
      {
        gasLimit: 1000000,
      },
    );
    await this.web3Wrapper.awaitTransactionSuccessAsync(txHash);
    return txHash;
  };

  // Returns the signed order
  signOrder = async (orderToSign, makerAddress) => {
    const signature = await signatureUtils.ecSignOrderAsync(
      this.providerEngine,
      orderToSign,
      makerAddress,
    );
    return signature;
  };

  // Returns an object mapping the address of each token to their balance in wei
  getTokenBalances = async accountPublicKey => {
    const tokenBalances = {};
    const shellMappingContract = await new this.web3.eth.Contract(
      ABI,
      SHELL_MAPPING_CONTRACT_ADDRESS,
    );
    for (let i = 0; i < 6; i++) {
      const contractAddress = await shellMappingContract.methods
        .shellMap(accountPublicKey, i)
        .call();
      const tokenContract = await new this.web3.eth.Contract(
        ShellABI,
        contractAddress,
      );
      tokenBalances[contractAddress] = await tokenContract.methods
        .balanceOf(accountPublicKey)
        .call();
    }
    return tokenBalances;
  };
}
