import {Provider} from './Provider';
import ABI from '../../ABI';
import ShellABI from '../../ShellABI';

import {
  assetDataUtils,
  BigNumber,
  ContractWrappers,
  generatePseudoRandomSalt,
  Order,
  orderHashUtils,
  signatureUtils,
  Web3ProviderEngine,
  RPCSubprovider,
} from '0x.js';
import {getFutureExpiration} from '../../utils/utils';
import {getContractAddressesForNetworkOrThrow} from '@0x/contract-addresses';
import {Web3Wrapper} from '@0x/web3-wrapper';

import {NULL_ADDRESS} from '../Constants';

export class CowriProvider extends Provider {
  constructor() {
    super();
    const Web3 = require('web3');
    this.web3 = new Web3('http://localhost:8545');
    this.providerEngine = new Web3ProviderEngine();
    this.providerEngine.addProvider(
      new RPCSubprovider('http://localhost:8545'),
    );
    this.providerEngine.start();
    this.web3Wrapper = new Web3Wrapper(this.providerEngine);
    this.contractWrappers = new ContractWrappers(this.providerEngine, {
      networkId: 42,
    });
  }

  sendToken = async (senderAddress, receiverAddress, token) => {
    const tokenContract = await new web3.eth.Contract(ShellABI, token.Address);
    await tokenContract.methods
      .transfer(receiverAddress, tokenDecimalAmount)
      .send({from: senderAddress});
  };

  swapToken = async (
    tokenToSend,
    tokenToReceive,
    senderAddress,
    receiverAddress,
  ) => {
    const kovanNetworkID = 42;
    const contractAddresses = getContractAddressesForNetworkOrThrow(
      kovanNetworkID,
    );
    const exchangeAddress = contractAddresses.exchange;
    console.log('exchange address: ' + exchangeAddress);
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
    console.log('maker approval hash');
    const makerApprovalTxHash = await this.contractWrappers.erc20Token.setUnlimitedProxyAllowanceAsync(
      tokenToSend.address,
      senderAddress,
    );
    await this.web3Wrapper.awaitTransactionSuccessAsync(makerApprovalTxHash);
    console.log('taker approval hash');
    const takerApprovalTxHash = await this.contractWrappers.erc20Token.setUnlimitedProxyAllowanceAsync(
      tokenToReceive.address,
      receiverAddress,
    );
    await this.web3Wrapper.awaitTransactionSuccessAsync(takerApprovalTxHash);
    console.log('give permission again');
    await new Promise(resolve => setTimeout(resolve, 20000));
    console.log('signing Order');
    const signedOrder = await this.signOrder(order, senderAddress);
    console.log('validating order fillable');
    await this.contractWrappers.exchange.validateOrderFillableOrThrowAsync(
      signedOrder,
    );

    return signedOrder;
  };

  fillSwap = async (signedOrder, takerAddress, takerAssetAmount) => {
    let txHash = await this.contractWrappers.exchange.fillOrderAsync(
      signedOrder,
      new BigNumber(takerAssetAmount),
      takerAddress,
      {
        gasLimit: 1000000,
      },
    );
    console.log('txHash: ' + txHash);
    await this.web3Wrapper.awaitTransactionSuccessAsync(txHash);
    console.log('Transaction success');
    return txHash;
  };

  //Returns the signed order
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
    const SHELL_MAPPING_CONTRACT_ADDRESS =
      '0xc8f91597515f5baa3ec9767b34b517cdeb839855';
    const accountAPublicKey = '0x141cc50934F7911D7f85051A7F3C14c70b6BcE3C';
    const tokenBalances = {};
    const shellMappingContract = await new this.web3.eth.Contract(
      ABI,
      SHELL_MAPPING_CONTRACT_ADDRESS,
    );
    for (var i = 0; i < 6; i++) {
      var contractAddress = await shellMappingContract.methods
        .shellMap(accountAPublicKey, i)
        .call();
      const tokenContract = await new this.web3.eth.Contract(
        ShellABI,
        contractAddress,
      );
      tokenBalances[
        contractAddress
      ] = await await tokenContract.methods.balanceOf(accountAPublicKey).call();
    }
    return tokenBalances;
  };
}
