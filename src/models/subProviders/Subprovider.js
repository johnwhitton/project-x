export class Subprovider {

  constructor() {
    if(this === Subprovider) {
      throw new TypeError('Abstract class Provider cannot be instantiated directly');
    }
  }

  setEngine = () => {
    throw new Error('setEngine must be implemented in subclass');
  }

  getSubprovider = () => {
    throw new Error('getSubprovider must be implemented in subclass');
  }
}
