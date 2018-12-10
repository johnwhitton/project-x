export class ProviderEngine {

  constructor() {
    if(this === ProviderEngine) {
      throw new TypeError('Abstract class ProviderEngine cannot be instantiated directly');
    }
  }

  addProvider = () => {
    throw new Error('cannot call methods from abstract class ProviderEngine');
  }

  start = () => {
    throw new Error('cannot call methods from abstract class ProviderEngine');
  }

  sendAsync = () => {
    throw new Error('cannot call methods from abstract class ProviderEngine');
  }
}

