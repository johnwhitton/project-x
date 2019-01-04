export class ContractAddresses {
  constructor() {
    if (new.target === ContractAddresses) {
      throw new TypeError(
        'Cannot instantiate abstract class ContractAddresses',
      );
    }
  }

  getContractAddressesForNetworkOrThrow = () => {
    throw new Error(
      'getContractAddressesForNetworkOrThrow must be called in subclass',
    );
  };
}
