import {Subprovider} from './Subprovider';
import { RPCSubprovider as ZeroExRPCSubprovider } from '0x.js';

export class RPCSubprovider extends Subprovider {

  constructor(rpcUrl) {
    super();
    this.rpcSubprovider = new ZeroExRPCSubprovider(rpcUrl);
  }

  setEngine = (engine) => {
    this.rpcSubprovider.setEngine(engine);
  }

  getSubprovider = () => {
    return this.rpcSubprovider;
  }

}
