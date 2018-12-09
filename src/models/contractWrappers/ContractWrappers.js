export class ContractWrappers {
  constructor() {
    if(this === ContractWrappers) {
      throw new TypeError('Cannot instantiate abstract class ContractWrappers');
    }
    if(!this.setUnlimitedProxyAllowanceAsync) {
      throw new Error('setUnlimitedProxyAllwanceAsyc must be declared in sub class');
    }
    if(!this.validateFillOrderThrowIfInvalidAsync) {
      throw new Error('validateFillOrderThrowIfInvalidAsync must be declared in sub class');
    }
  }
}
