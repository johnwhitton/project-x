export class Provider {
  constructor() {
    if (new.target === Provider) {
      throw new TypeError('Cannot instantiate abstract class Provider');
    }
  }

  sendToken = () => {
    throw new Error('sendToken must be called in subclass');
  };

  swapToken = () => {
    throw new Error('swapToken must be called in subclass');
  };

  fillSwap = () => {
    throw new Error('fillSwap must be called in subclass');
  };

  signOrder = () => {
    throw new Error('signOrder must be called in subclass');
  };

  shellLedgerQuery = () => {
    throw new Error('shellLedgerQuery must be called in subclass');
  };

  editShellLedger = () => {
    throw new Error('editShellLedger must be called in subclass');
  };

  getTokenBalances = () => {
    throw new Error('getTokenBalances must be called in subclass');
  };

  awaitTransactionSuccess = () => {
    throw new Error('awaitTransactionSuccess must be called in subclass');
  };
}
