export default class Request {
  constructor() {
    if (new.target === Request) {
      throw new TypeError('Cannot instantiate abstract class Provider');
    }
  }

  getAsync = () => {
    throw new Error('get must be called in subclass');
  };

  postAsync = () => {
    throw new Error('post must be called in subclass');
  };
}
