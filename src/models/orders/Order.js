export class Order {
  constructor() {
    if (new.target === Order) {
      throw new TypeError(
        'Abstract class Order cannot be instantiated directly',
      );
    }
  }

  isValid = () => {
    throw new Error('isValid must be implemented in subclass');
  };

  submitOrder = () => {
    throw new Error('submitOrder must be implemented in subclass');
  };

  fillOrder = () => {
    throw new Error('fillOrder must be implemented in subclass');
  };
}
