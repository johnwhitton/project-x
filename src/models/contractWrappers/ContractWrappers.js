export class ContractWrappers {
  constructor() {
    if(this === ContractWrappers) {
      throw new TypeError('Cannot instantiate abstract class ContractWrappers');
    }
  }

  setUnlimitedProxyAllowanceAsync = async () => {
    throw new Error('setUnlimitedProxyAllowanceAsync must be called in sub class');
  }

  validateFillOrderThrowIfInvalidAsync = async => {
    throw new Error('validateFillOrderThrowIfInvalidAsync must be called in sub class');
  }
}
