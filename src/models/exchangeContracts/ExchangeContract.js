export class ExchangeContract {

  constructor() {
    this.ExchangeAddress = '';
    if (new.target === ExchangeContract) {
      throw new TypeError("Abstract class ExchangeContract cannot be instantiated directly.");
    }
  }

}
