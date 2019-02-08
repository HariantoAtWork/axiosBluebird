# axiosBluebird
Axios with Promise (Bluebird) cancelation


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

Promise: Bluebird Promise with Cancelation enabled

get: Makes request with GET method

post: Makes request with POST method


## NOTE!

Param properties as array
```js
params: {
  filter: [8, 16, 32]
}
```

will output:

```
filter=8&filter=16&filter=32
```

Idealisticly:
```
filter=[8,16,32]
```

But some servers can't accept brackets
