"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _axios = require('axios');

var Promise = require('./lib/Promise');

var _require = require('query-string'),
    stringify = _require.stringify;

var methodsNoData = ['delete', 'get', 'head', 'options'];
var methodsWithData = ['post', 'put', 'patch'];
var axiosBluebird = {
  Promise: Promise,
  axios: function axios(configRequest) {
    return new Promise(function (fulfil, reject, onCancel) {
      // eslint-disable-line
      var cancelSource = _axios.CancelToken.source();

      var cancelToken = configRequest.hasOwnProperty('cancelToken') ? configRequest.cancelToken : cancelSource.token;

      var requestConfig = _objectSpread({}, configRequest, {}, {
        cancelToken: cancelToken
      });

      onCancel(function () {
        cancelSource.cancel();
      });
      return _axios(requestConfig).then(fulfil)["catch"](reject);
    });
  }
};
methodsNoData.forEach(function (method) {
  axiosBluebird[method] = function (url, params) {
    return new Promise(function (fulfil, reject, onCancel) {
      // eslint-disable-line
      var cancelSource = _axios.CancelToken.source();

      var cancelToken = cancelSource.token;
      var config = {
        params: params,
        cancelToken: cancelToken,
        paramsSerializer: stringify
      };
      onCancel(function () {
        cancelSource.cancel();
      });
      return _axios[method](url, config).then(fulfil)["catch"](reject);
    });
  };
});
methodsWithData.forEach(function (method) {
  axiosBluebird[method] = function (url, params) {
    return new Promise(function (fulfil, reject, onCancel) {
      // eslint-disable-line
      var cancelSource = _axios.CancelToken.source();

      var cancelToken = cancelSource.token;
      onCancel(function () {
        cancelSource.cancel();
      });
      return _axios[method](url, params, {
        cancelToken: cancelToken
      }).then(fulfil)["catch"](reject);
    });
  };
});
module.exports = axiosBluebird;
