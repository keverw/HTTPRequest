#HTTPRequest#

*DO NOT USE, NOT READY*

A simple yet powerful HTTP request library inspired by jQuery and LSL written in Javascript for client side and Serverside(Node.js) Javascript.

##request##
`request(url, parameters, callback)`
A lower level function, but I hope you never really need to use it as `post`, `get` is a wrapper around it.

##post##

`post(url, data, callback, options)`

A url, data(object, can be empty also `{}`), callback are required.
options is not required, but it can be a object.

##get##
`get(url, callback, options)`
url and callback are required. 

options is not required, but it can be a object.

##encode##
`encode(url)`

takes a url and escapes it, then returns it.

##decode##
`encode(url)`

takes a decodeed url and Unencode's it, then returns it.


##options##

*option names are NOT case sensitive.

* `USERAGENT` - string - Write your own [user agent](http://en.wikipedia.org/wiki/User_agent), default is `navigator.userAgent`, if that fails is used `HTTPRequest JS/VERSION`
* `QUERY` - `string` or `object` - appends to the end of the `url`.
* `POST_DATA` - Post data `string` or `object`

##parameters##
Everything as options, but also:

`METHOD` - string - `'GET'`, `'POST'`, `'PUT'` and `'DELETE'`, default is `'GET'`

##callback##

`status, headers, content`

* `status` - is HTTP code (like 404 or 200)
* `headers` - is a object with the respone headers
* `content` - The metadata `

##Todo##
Write a wrapper for `PUT` and `DELETE`