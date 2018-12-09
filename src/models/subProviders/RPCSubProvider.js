import SubProvider from './SubProvider';

const RpcSubprovider = require('web3-provider-engine/subproviders/rpc.js');

export class RPCSubProvider extends SubProvider {

  constructor(rpcUrl) {
    super();
    this.rpcUrl = rpcUrl;
    this.rpcSubProvider = RpcSubprovider(rpcUrl);
  }

  handleRequest = (payload, next, end) => {
    this.rpcSubProvider.handleRequest(payload, next, end);
  }

}
