const axios = require('axios')
const Promise = require('./lib/Promise')
const { stringify } = require('query-string')
const methodsNoData = ['delete', 'get', 'head', 'options']
const methodsWithData = ['post', 'put', 'patch']

const axiosBluebird = {
  Promise,
  axios: configRequest => new Promise((fulfil, reject, onCancel) => { // eslint-disable-line
    const cancelSource = axios.CancelToken.source()
    const cancelToken = configRequest.hasOwnProperty('cancelToken') ? configRequest.cancelToken : cancelSource.token
    const requestConfig = {...configRequest, ...{ cancelToken }}

    onCancel(() => {
      cancelSource.cancel()
    })

    return axios(requestConfig)
      .then(fulfil)
      .catch(reject)
  })
}

methodsNoData.forEach(method => {
  axiosBluebird[method] = (url, params) => new Promise((fulfil, reject, onCancel) => { // eslint-disable-line
    const cancelSource = axios.CancelToken.source()
    const cancelToken = cancelSource.token

    const config = {
      params,
      cancelToken,
      paramsSerializer: stringify
    }

    onCancel(() => {
      cancelSource.cancel()
    })

    return axios
      [method](url, config)
      .then(fulfil)
      .catch(reject)
  })
})

methodsWithData.forEach(method => {
  axiosBluebird[method] = (url, params) => new Promise((fulfil, reject, onCancel) => { // eslint-disable-line
    const cancelSource = axios.CancelToken.source()
    const cancelToken = cancelSource.token

    onCancel(() => {
      cancelSource.cancel()
    })

    return axios
      [method](url, params, { cancelToken })
      .then(fulfil)
      .catch(reject)
  })
})

module.exports = axiosBluebird
