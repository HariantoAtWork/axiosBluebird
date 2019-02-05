const Promise = require('bluebird')
Promise.config({
  // Enable cancellation
  cancellation: true
})
module.exports = Promise
