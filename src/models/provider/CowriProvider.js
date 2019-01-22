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

import {NULL_ADDRESS} from '../Constants';

export class CowriProvider extends Provider {
  constructor() {
    super();
    const Web3 = require('web3');
    this.web3 = new Web3(
      'https://kovan.infura.io/v3/0560979f59e84ebda0c61449fc42d35d',
    );
    this.providerEngine = new Web3ProviderEngine();
    this.providerEngine.addProvider(
      new RPCSubprovider(
        'https://kovan.infura.io/v3/0560979f59e84ebda0c61449fc42d35d',
      ),
    );
    this.providerEngine.start();
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
      makerFee: '0',
      takerFee: '0',
    };
    const orderHashHex = orderHashUtils.getOrderHashHex(order);
    const signature = await this.signOrder(
      orderHashHex,
      '0x2991B7A593FB156520D62E35D611F960DED3AA1ED0600DA4AE26B4091A4EF11D'.toLowerCase(),
    );
    const signedOrder = {...order, signature};
    console.log(signedOrder);
    return signedOrder;
  };

  fillSwap = async (signedOrder, takerAddress, takerAssetAmount) => {
    txHash = await this.contractWrappers.exchange.fillOrderAsync(
      signedOrder,
      new BigNumber(takerAssetAmount),
      takerAddress,
      {
        gasLimit: 100000,
      },
    );
  };

  //Returns the signed order
  signOrder = async (orderToSign, privateKeyUPDATETHIS) => {
    return await this.web3.eth.accounts.sign(orderToSign, privateKeyUPDATETHIS)
      .signature;
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
