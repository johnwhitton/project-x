export class SubProvider {

  constructor() {
    if(this === SubProvider) {
      throw new TypeError('Abstract class Provider cannot be instantiated directly');
    }
  }

  handleRequest = () => {
    throw new Error('handleRequest must be implemented in subclass');
  }

  setEngine = () => {
    throw new Error('setEngine must be implemented in subclass');
  }
}
