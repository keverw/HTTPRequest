[![build status](https://secure.travis-ci.org/keverw/HTTPRequest.png)](http://travis-ci.org/keverw/HTTPRequest)
#HTTPRequest v0.1.1#

A simple yet powerful HTTP request library inspired by jQuery and LSL written in Javascript for client(framework independent) and server(Node.js) Javascript.

## Setup##

To set up HTTPRequest on your Node.js server use npm(case sensitive package name).

	npm install HTTPRequest

If you want to use HTTPRequest on the client-side (browser), just include HTTPRequest.js into your page.

	<script type='text/javascript' src='HTTPRequest.js'></script>

##Example##
First, you have to require the HTTPRequest module (if you're using it client-side, this isn't necessary).

	var HTTPRequest = require('HTTPRequest');

```
HTTPRequest.get('get_test.php', function(status, headers, content)
{
	console.log(status, headers, content);
});
```

[Recaptcha](https://gist.github.com/2862894/bed9f28eb497e4810fee68d9600ace52469d6047) - A small [reCAPTCHA](http://www.google.com/recaptcha) module I wrote that depends on this module.

##request##
`request(url, parameters, callback)`
A lower level function, but I hope you never really need to use it as `post`, `get` is a wrapper around it.

##stop requests##

* `stopID(id)`
* `stopTag(tag)`
* `stopAll()`

When a request is stopped, the callback isn't called for the request.

##post##

`post(url, data, callback, options)`

A url, data(object, can be empty also `{}`), callback are required.
options is not required, but it's a object.

##get##
`get(url, callback, options)`
url and callback are required. 

options is not required, but it's a object.

##delete##
`del(url, callback, options)`

same as get

##put##
`put(url, data, callback, options)`

same as post

##encode##
`encode(url)`

takes a url and escapes it, then returns it.

##decode##
`encode(url)`

takes a decodeed url and Unencode's it, then returns it.


##options##

*option names are NOT case sensitive.

* `QUERY` - `string` or `object` - appends to the end of the `url`.
* `DATA` - `'POST'` or `'PUT'` data `string` or `object`
* `DATATYPE` - the expected content type. See content type section for more details. The value of this isn't case sensitive.
* `TAG` - a tag to be used in `processedCallback`, `newRequestCallback`, also doesn't have to be unique. The `defaultTag` is `untagged`. You can override the default by `HTTPRequest.defaultTag = 'TextHere';`

##server side only options##
* `USERAGENT` - string - Write your own [user agent](http://en.wikipedia.org/wiki/User_agent), default is `node.js`. This is a alias/shortcut insead of setting your own headers
* `HEADERS` - An object containing your own defined headers.

##parameters##
Everything as options, but also:

`METHOD` - string - `'GET'`, `'POST'`, `'PUT'` and `'DELETE'`, default is `'GET'`

##DATATYPE##
`DATATYPE` can be set as the type of content you expected from the server.

* [`JSON`](http://en.wikipedia.org/wiki/JSON) - when set as json, callback `contents` will be a object of the JSON when valid JSON, `null` when invalid JSON.


##callback##

`status, headers, content`

* `status` - is an [HTTP status code](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes) (like 404 or 200)
* `headers` - is an object with the respone http headers
* `content` - contains the requests response.

##Ajax stop and start callbacks

```
function ajaxLoaderStart()
{
	console.log('Started');
}

HTTPRequest.setAjaxStart(ajaxLoaderStart); //this call back is called when no pending HTTP requests exists.

function ajaxLoaderStop()
{
	console.log('Stopped');
}

HTTPRequest.setAjaxStop(ajaxLoaderStop); //this get's called when all the pending HTTP requests are finished.

```

These are great for providing a loading spinner on the page.

##Processed ID Callback 

```
function processedID(tag, id)
{
	console.log('processed: ' + tag + ' , ' + id);
}

HTTPRequest.setProcessedCallback(processedID);

```

##New Request Callback
```
function newRequestID(tag, id)
{
	console.log('new id: ' + tag + ' , ' + id);
}

HTTPRequest.setnewRequestCallback(newRequestID);

```

##credits##
* `trim` , `encode` and `encode` functions are from [php.js](http://phpjs.org/pages/home)
* `parseJSON` function is from [jQuery v1.7.2](http://jquery.com/), but does not require jQuery as it's inclued in the same namespace.
* Major thanks to [node-XMLHttpRequest](https://github.com/driverdan/node-XMLHttpRequest) for giving us a XMLHttpRequest Object, that really helps make this both client and server side.