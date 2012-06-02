var HTTPRequest = {
    //Public
    post: function (url, data, callback, options)
    {
        var parameters = {
            METHOD: 'POST',
            post_data: data
        };

        var request_parms = this._mergeobjs(options, parameters);
        
        this.request(url, request_parms, callback, options);
    },
    get: function (url, callback, options)
    {
        var parameters = {
            METHOD: 'GET'
        };

        var request_parms = this._mergeobjs(options, parameters);

        this.request(url, request_parms, callback);
    },
    request: function (url, parameters, callback)
    {
        parameters = this._key2lower(parameters);

        if (typeof parameters.method == 'undefined')
        {
            parameters.method = 'GET';
        }
        
        //post_data
        if (typeof parameters.post_data != 'undefined')
        {
        	if (typeof parameters.post_data == 'object')
        	{
        		console.log(parameters.post_data);
        		parameters.post_data = '';
        	}
        }

		//do HTML
        var xhr = this._getXHR();
        if (xhr == null) //NO XHR :(
        {
            callback(0, {}, null); //return an error code zero
        }
        else
        {
            var that = this;
            xhr.onreadystatechange = function ()
            {
                if (xhr.readyState == 4)
                {
                    callback(xhr.status, that._headersToHeaders(xhr.getAllResponseHeaders()), xhr.responseText);
                }
            }
            xhr.open(parameters.method, url, true);
            if (typeof exports == 'object' && exports)
            {
                if (typeof parameters.useragent != 'undefined')
                {
                    xhr.setRequestHeader('User-Agent', parameters.useragent);
                }
            }
            
            if (parameters.method == 'POST')
            {
            	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            	if (typeof parameters.post_data != 'undefined')
            	{
            		xhr.setRequestHeader("Content-length", parameters.post_data.length);
            	}
            }

			if (parameters.method == 'POST')
            {
            	if (typeof parameters.post_data != 'undefined')
            	{
            		xhr.send(parameters.post_data);
            	}
            	else
            	{
            		xhr.send();
            	}
            }
            else
            {
            	xhr.send();
            }
        }

    },
    encode: function (url)
    {
        return 'later!';
    },
    decode: function (url)
    {
        return 'later!';
    },
    //Private
    _headersToHeaders: function (headers_str)
    {
        if (headers_str.indexOf('\n') !== -1)
        {
            var headers_list = headers_str.split('\n');

            var header_obj = {};
            for (var key in headers_list)
            {
                var header = headers_list[key].replace(/\r/g, '');

                if (header.indexOf(':') !== -1)
                {
                    var firstcharpos = this._firstcharpos(header, ':');

                    var field = header.substring(0, firstcharpos);
                    var value = header.substring(firstcharpos);
                    value = value.substring(2);

                    header_obj[field] = value;
                }
            }
            return header_obj;
        }
        else
        {
            return {};
        }
    },
    _firstcharpos: function (string, c)
    {
        var letters = string.split('');
        for (var key in letters)
        {
            if (letters[key] == c)
            {
                return key;
            }
        }
        return null;
    },
    _getXHR: function ()
    {
        if (typeof exports == 'object' && exports) //This is a module, require XHR support.
        {
            XMLHttpRequest = require('./lib/XMLHttpRequest.js').XMLHttpRequest; //Using xmlhttprequest 1.4.0 https://github.com/driverdan/node-XMLHttpRequest
            return new XMLHttpRequest();
        }
        else //Thanks http://www.webmasterworld.com/javascript/4027629.htm
        {
            if (window.XMLHttpRequest)
            {
                // Chrome, Firefox, IE7+, Opera, Safari
                return new XMLHttpRequest();
            }
            // IE6
            try
            {
                // The latest stable version. It has the best security, performance, 
                // reliability, and W3C conformance. Ships with Vista, and available 
                // with other OS's via downloads and updates. 
                return new ActiveXObject('MSXML2.XMLHTTP.6.0');
            }
            catch (e)
            {
                try
                {
                    // The fallback.
                    return new ActiveXObject('MSXML2.XMLHTTP.3.0');
                }
                catch (e) //This browser is not AJAX enabled.
                {
                    return null;
                }
            }
        }
    },
    _key2lower: function (obj)
    {
        if (typeof obj === 'object')
        {
            var newobj = {};
            for (var attrname in obj)
            {
                newobj[attrname.toLowerCase()] = obj[attrname];
            }
            return newobj;
        }
        else
        {
            return {};
        }
    },
    _mergeobjs: function (obj1, obj2)
    {
        //Make sure they are objects!
        if (typeof obj1 != 'object')
        {
            obj1 = {};
        }

        if (typeof obj2 != 'object')
        {
            obj2 = {};
        }
        //Merge
        var obj3 = {};
        for (var attrname in obj1)
        {
            obj3[attrname] = obj1[attrname];
        }
        for (var attrname in obj2)
        {
            obj3[attrname] = obj2[attrname];
        }
        return obj3;
    }
};

// Make a Node module, if possible.
if (typeof exports == 'object' && exports)
{
    module.exports = HTTPRequest;
}