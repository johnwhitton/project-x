import {SubProvider} from './SubProvider';

const Web3RpcSubprovider = require('web3-provider-engine/subproviders/rpc.js');

export class RPCSubProvider extends SubProvider {

  constructor(rpcUrl) {
    super();
    this.rpcSubProvider = new Web3RpcSubprovider(rpcUrl);
  }

  handleRequest = (payload, next, end) => {
    this.rpcSubProvider.handleRequest(payload, next, end);
  }

  setEngine = (engine) => {
    this.rpcSubProvider.setEngine(engine);
  }

}
