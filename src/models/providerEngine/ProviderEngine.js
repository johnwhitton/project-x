export class ProviderEngine {

  constructor() {
    if(this === ProviderEngine) {
      throw new TypeError('Abstract class ProviderEngine cannot be instantiated directly');
    }
    if(!this.addProvider) {
      throw new Error('addProvider must be implemented in concrete subclass');
    }
    if(!this.start) {
      throw new Error('start must be implemented in concrete subclass');
    }
  }

}

