import Request from './request';

export default class AxiosRequest extends Request {
  constructor() {
    super();
    this.axios = require('axios');
  }

  getAsync = (path, callback) => {
    this.axios.get(path).then(response => {
      callback(response);
    });
  };

  postAsync = (path, data, callback) => {
    this.axios.post(path, data).then(response => {
      callback(response);
    });
  };
}
