#HTTPRequest v0.0.3 Experimental#

This build has content_type support.

A simple yet powerful HTTP request library inspired by jQuery and LSL written in Javascript for clientside and Serverside(Node.js) Javascript. Major thanks to [node-XMLHttpRequest](https://github.com/driverdan/node-XMLHttpRequest) for giving us a XMLHttpRequest Object, that really helps make this both client/server.

## Setup##

To set up HTTPRequest on your Node.js server use npm(case sensitive package name).

	npm install HTTPRequest

If you want to use HTTPRequest on the client-side (browser), just include HTTPRequest.js into your page.

	<script type='text/javascript' src='HTTPRequest.js'></script>

##Example##
First, you have to do is require the HTTPRequest module (if you're using it client-side, this isn't necessary).

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

##post##

`post(url, data, callback, options)`

A url, data(object, can be empty also `{}`), callback are required.
options is not required, but it can be a object.

##get##
`get(url, callback, options)`
url and callback are required. 

options is not required, but it can be a object.

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
* `CONTENT_TYPE` - the requested content type. See content type section for more details. The value of this isn't case sensitive.

##serverside only options##
* `USERAGENT` - string - Write your own [user agent](http://en.wikipedia.org/wiki/User_agent), default is `node.js`. Setting this ONLY works on the server.

##parameters##
Everything as options, but also:

`METHOD` - string - `'GET'`, `'POST'`, `'PUT'` and `'DELETE'`, default is `'GET'`

##CONTENT_TYPE##
`CONTENT_TYPE` can be set as the type of content you expected from the server. **currently only [JSON](http://en.wikipedia.org/wiki/JSON) is supported**

* `JSON` - when set as json, callback `contents` will be a object of the JSON when valid JSON, `null` when invalid JSON.

##callback##

`status, headers, content`

* `status` - is HTTP code (like 404 or 200)
* `headers` - is a object with the respone headers
* `content` - The metadata `



##todo##

**v0.0.4:**

Write a option where any header can be set, this will only work on the serverside. this will also require changes to XMLHttpRequest.js(I have some ideas of a option that will disable the forbidden header check, might fork it, add a optional way to turn it off, use that build for this, and try to see if it get pulled in to the offical version)