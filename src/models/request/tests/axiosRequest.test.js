import {assert} from 'chai';
import AxiosRequest from '../axiosRequest';
const nock = require('nock');

describe('axios Request', () => {
  it('Test that the get method calls the response', () => {
    let request = new AxiosRequest();

    const scope = nock('http://localhost')
      .get('/')
      .reply(200, 'Callback invoked');

    let callback = response => {
      assert.equal(response.data, 'Callback invoked');
    };
    request.getAsync('http://localhost/', callback);
  });

  it('Test that the post method calls the response', () => {
    let request = new AxiosRequest();

    const scope = nock('http://localhost')
      .post('/')
      .reply(200, 'Callback invoked');

    let callback = response => {
      assert.equal(response.data, 'Callback invoked');
    };
    request.postAsync('http://localhost/', '', callback);
  });
});
