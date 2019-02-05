'use strict';

var axios = require('axios');
var Promise = require('./lib/Promise');

var _require = require('query-string'),
    stringify = _require.stringify;

var axiosBluebird = {
  Promise: Promise,
  get: function get(url, params) {
    return new Promise(function (fulfil, reject, onCancel) { // eslint-disable-line
      var cancelSource = axios.CancelToken.source();
      var cancelToken = cancelSource.token;

      var config = {
        params: params,
        cancelToken: cancelToken,
        paramsSerializer: stringify
      };

      axios.get(url, config).then(fulfil).catch(reject);

      onCancel(function () {
        cancelSource.cancel();
      });
    });
  },
  post: function post(url, params) {
    return new Promise(function (fulfil, reject, onCancel) { // eslint-disable-line
      var cancelSource = axios.CancelToken.source();
      var cancelToken = cancelSource.token;

      axios.post(url, params, { cancelToken: cancelToken }).then(fulfil).catch(reject);

      onCancel(function () {
        cancelSource.cancel();
      });
    });
  }
};

module.exports = axiosBluebird;