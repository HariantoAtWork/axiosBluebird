const axiosBluebird = require('../axiosbluebird')
const Promise = axiosBluebird.Promise
let retrieveDataRequest = Promise.resolve()

 
const retrieveData = (url, params) => {
  retrieveDataRequest.cancel()
  retrieveDataRequest = axiosBluebird.get(url, params || {})
  return retrieveDataRequest
    .then(json => json.data)
    .catch(console.error.bind(console, 'FAIL - retrieveData:'))
}

retrieveData('http://api.sylo.space/api/valtech/cases', {id: 17})
retrieveData('http://api.sylo.space/api/valtech/cases?id=40', {id: [1,2,3]}) // previous progressing queue will cancel
  .then(console.log.bind(console))

let sendDataRequest = Promise.resolve()
const sendData = (url, params) => {
  sendDataRequest.cancel()
  sendDataRequest = axiosBluebird.post(url, params || {})
  return sendDataRequest
    .catch(console.error.bind(console, 'FAIL - sendData:'))
}


sendData('http://api.sylo.space/api/valtech/cases', {id: 700})
  .then(console.log.bind(console))