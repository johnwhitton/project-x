export class Provider {
  constructor() {
    if(this === Provider) {
      throw new TypeError('Cannot instantiate abstract class Provider');
    }
    if(!this.awaitTransactionSuccessAsync) {
      throw new Error('awaitTransactionSuccessAsync must be declared in subclass');
    }
  }
}
