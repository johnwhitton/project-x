export class ProviderEngine {

  constructor() {
    if(new.target === ProviderEngine) {
      throw new TypeError('Abstract class ProviderEngine cannot be instantiated directly');
    }
  }

  addProvider = (provider) => {
    throw new Error('cannot call methods from abstract class ProviderEngine');
  }

  start = () => {
    throw new Error('cannot call methods from abstract class ProviderEngine');
  }

  getEngine = () => {
    throw new Error('cannot call methods from abstract class ProviderEngine');
  }
}

