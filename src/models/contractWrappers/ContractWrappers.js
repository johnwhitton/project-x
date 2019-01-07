export class ContractWrappers {
  constructor() {
    if (new.target === ContractWrappers) {
      throw new TypeError('Cannot instantiate abstract class ContractWrappers');
    }
  }

  setUnlimitedProxyAllowanceAsync = async () => {
    throw new Error(
      'setUnlimitedProxyAllowanceAsync must be called in sub class',
    );
  };

  validateFillOrderThrowIfInvalidAsync = async => {
    throw new Error(
      'validateFillOrderThrowIfInvalidAsync must be called in sub class',
    );
  };

  fillOrderAsync = async => {
    throw new Error('fillOrderAsync must be called in sub class');
  };

  depositEtherAsync = async => {
    throw new Error('depositEtherAsync must be called in sub class');
  };
}
