export class Provider {
  constructor() {
    if(this === Provider) {
      throw new TypeError('Cannot instantiate abstract class Provider');
    }
  }

  awaitTransactionSuccessAsync = async () => {
    throw new Error('awaitTransactionSuccessAsync must be called in subclass');
  }
}
