# axiosBluebird
Axios with Promise (Bluebird) cancelation

> NODE: v10.15.1

> NPM: v6.4.1

## How to use

```js
const axiosBluebird = require('axiosbluebird')
const Promise = axiosBluebird.Promise
```

```js
let retrieveDataRequest = Promise.resolve()

const retrieveData = (url, params) => {
  retrieveDataRequest.cancel()
  retrieveDataRequest = axiosBluebird.get(url, params)
  retrieveDataRequest
  .then(json => {
    // DO STUFF
  })
  .catch(console.error.bind(console, 'FAIL - retrieveData:'))
  
  return retrieveDataRequest
}
```

```js
retrieveData('http://localhost/action', {id: 17})
retrieveData('http://localhost/action', {id: 39}) // previous progressing queue will cancel
```


## Methods

Promise: Bluebird Promise
get: Makes request with GET method
post: Makes request with POST method

