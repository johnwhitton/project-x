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
    var headers = {
      'Content-Type': 'application/json',
    };
    this.axios.post(path, data, {headers: headers}).then(response => {
      callback(response);
    });
  };
}
