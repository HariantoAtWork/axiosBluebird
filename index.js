const axios = require('axios')
const Promise = require('./lib/Promise')
const { stringify } = require('query-string')

const axiosBluebird = {
  Promise,
  get: (url, params) => new Promise((fulfil, reject, onCancel) => { // eslint-disable-line
    const cancelSource = axios.CancelToken.source()
    const cancelToken = cancelSource.token

    const config = {
      params,
      cancelToken,
      paramsSerializer: stringify
    }

    axios
      .get(url, config)
      .then(fulfil)
      .catch(reject)

    onCancel(() => {
      cancelSource.cancel()
    })
  }),
  post: (url, params) => new Promise((fulfil, reject, onCancel) => { // eslint-disable-line
    const cancelSource = axios.CancelToken.source()
    const cancelToken = cancelSource.token

    axios
      .post(url, params, { cancelToken })
      .then(fulfil)
      .catch(reject)

    onCancel(() => {
      cancelSource.cancel()
    })
  })
}

module.exports = axiosBluebird
