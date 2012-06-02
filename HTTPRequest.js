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
              	var str = [];
  				for(var key in parameters.post_data)
  				{
  					str.push(this.encode(key) + '=' + this.encode(parameters.post_data[key]));
  				}	
  				parameters.post_data = str.join('&');
            }
        }

        //do XHR
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
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                if (typeof parameters.post_data != 'undefined')
                {
                   // xhr.setRequestHeader("Content-length", parameters.post_data.length);
                }
                //xhr.setRequestHeader("Connection", "close");
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
    encode: function (str)
    {
        // URL-encodes string  
        // 
        // version: 1109.2015
        // discuss at: http://phpjs.org/functions/urlencode
        // +   original by: Philip Peterson
        // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // +      input by: AJ
        // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // +   improved by: Brett Zamir (http://brett-zamir.me)
        // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // +      input by: travc
        // +      input by: Brett Zamir (http://brett-zamir.me)
        // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // +   improved by: Lars Fischer
        // +      input by: Ratheous
        // +      reimplemented by: Brett Zamir (http://brett-zamir.me)
        // +   bugfixed by: Joris
        // +      reimplemented by: Brett Zamir (http://brett-zamir.me)
        // %          note 1: This reflects PHP 5.3/6.0+ behavior
        // %        note 2: Please be aware that this function expects to encode into UTF-8 encoded strings, as found on
        // %        note 2: pages served as UTF-8
        // *     example 1: urlencode('Kevin van Zonneveld!');
        // *     returns 1: 'Kevin+van+Zonneveld%21'
        // *     example 2: urlencode('http://kevin.vanzonneveld.net/');
        // *     returns 2: 'http%3A%2F%2Fkevin.vanzonneveld.net%2F'
        // *     example 3: urlencode('http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a');
        // *     returns 3: 'http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a'
        str = (str + '').toString();

        // Tilde should be allowed unescaped in future versions of PHP (as reflected below), but if you want to reflect current
        // PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
        return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
        replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
    },
    decode: function (str)
    {
        // Decodes URL-encoded string  
        // 
        // version: 1109.2015
        // discuss at: http://phpjs.org/functions/urldecode
        // +   original by: Philip Peterson
        // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // +      input by: AJ
        // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // +   improved by: Brett Zamir (http://brett-zamir.me)
        // +      input by: travc
        // +      input by: Brett Zamir (http://brett-zamir.me)
        // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // +   improved by: Lars Fischer
        // +      input by: Ratheous
        // +   improved by: Orlando
        // +      reimplemented by: Brett Zamir (http://brett-zamir.me)
        // +      bugfixed by: Rob
        // +      input by: e-mike
        // +   improved by: Brett Zamir (http://brett-zamir.me)
        // %        note 1: info on what encoding functions to use from: http://xkr.us/articles/javascript/encode-compare/
        // %        note 2: Please be aware that this function expects to decode from UTF-8 encoded strings, as found on
        // %        note 2: pages served as UTF-8
        // *     example 1: urldecode('Kevin+van+Zonneveld%21');
        // *     returns 1: 'Kevin van Zonneveld!'
        // *     example 2: urldecode('http%3A%2F%2Fkevin.vanzonneveld.net%2F');
        // *     returns 2: 'http://kevin.vanzonneveld.net/'
        // *     example 3: urldecode('http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a');
        // *     returns 3: 'http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a'
        return decodeURIComponent((str + '').replace(/\+/g, '%20'));
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

                    var field = header.substring(0, firstcharpos).toLowerCase();
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