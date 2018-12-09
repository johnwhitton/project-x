export class SubProvider {

  constructor() {
    if(this === Provider) {
      throw new TypeError('Abstract class Provider cannot be instantiated directly');
    }
    if(!this.handleRequest) {
      throw new Error('handleRequest must be implemented in subclass');
    }
  }

}
