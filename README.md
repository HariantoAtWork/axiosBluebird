# axiosBluebird

Axios with Promise (Bluebird) cancelation

> NODE: v10.15.1

> NPM: v6.4.1

## How to use - get

```js
const axiosBluebird = require("axiosbluebird")
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
    .catch(console.error.bind(console, "FAIL - retrieveData:"))

  return retrieveDataRequest
}
```

```js
retrieveData("http://localhost/action", { id: 17 })
retrieveData("http://localhost/action", { id: 39 }) // previous progressing queue will cancel
```

## How to use - axios

> Parameters as _object_ in axios [documentation](https://www.npmjs.com/package/axios)

> Parameters as _string_ not supported

```js
const axiosBluebird = require("axiosbluebird")
const Promise = axiosBluebird.Promise
```

```js
let axiosDataRequest = Promise.resolve()

const axiosData = requestConfig => {
  axiosDataRequest.cancel()
  axiosDataRequest = axiosBluebird.axios(requestConfig)
  axiosDataRequest.catch(console.error.bind(console, "FAIL - axiosData:"))

  return axiosDataRequest
}
```

```js
// 1st request
axiosData({
  method: "post",
  url: "/user/12345",
  data: {
    firstName: "Fred",
    lastName: "Flintstone"
  }
})

// 2nd request
axiosData({
  method: "get",
  url: "http://bit.ly/2mTM3nY",
  responseType: "stream"
}).then(response =>
  response.data.pipe(fs.createWriteStream("ada_lovelace.jpg"))
) // previous progressing queue will be canceled
```

> `responseType: 'stream'` not yet tested

## Methods

Promise: Bluebird Promise with Cancelation enabled

axios: Request with configuration

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
