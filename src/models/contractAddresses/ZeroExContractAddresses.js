import { getContractAddressesForNetworkOrThrow  } from '@0x/contract-addresses';
import { ContractAddresses } from './ContractAddresses';

export class ZeroExContractAddresses extends ContractAddresses {
  constructor() {
    super();
  }

  getContractAddressesForNetworkOrThrow = (networkId) => {
    const contractAddresses = getContractAddressesForNetworkOrThrow(networkId);
    return contractAddresses;
  }
}


