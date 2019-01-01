export class ContractAddresses {
  constructor() {
    if(this === ContractAddresses) {
      throw new TypeError('Cannot instantiate abstract class ContractAddresses');
    }
  }

  getContractAddressesForNetworkOrThrow = () => {
    throw new Error("getContractAddressesForNetworkOrThrow must be calledin subclass");
  }
}
