/*
HTTPRequest v0.0.5
https://github.com/keverw/HTTPRequest
*/
var HTTPRequest = {
    //Public
    post: function (url, data, callback, options)
    {
        var parameters = {
            METHOD: 'POST',
            data: data
        };

        var request_parms = this._mergeobjs(options, parameters);

        this.request(url, request_parms, callback, options);
    },
    put: function (url, data, callback, options)
    {
        var parameters = {
            METHOD: 'PUT',
            data: data
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
    del: function (url, callback, options)
    {
        var parameters = {
            METHOD: 'DELETE'
        };

        var request_parms = this._mergeobjs(options, parameters);

        this.request(url, request_parms, callback);
    },
    request: function (url, parameters, callback)
    {
        parameters = this._key2lower(parameters);

        if (typeof parameters.method === 'undefined')
        {
            parameters.method = 'GET';
        }

        //CONTENT TYPE
        if (typeof parameters.datatype !== 'undefined')
        {
            parameters.datatype = parameters.datatype.toLowerCase();
            if (parameters.datatype !== 'json' || parameters.datatype !== 'xml')
            {
                console.log('Invalid datatype option');
            }
        }
        else
        {
            parameters.datatype = null;
        }

        //data
        if (typeof parameters.data !== 'undefined')
        {
            parameters.data = this._objToQuery(parameters.data);
        }

        if (typeof parameters.query !== 'undefined')
        {
            parameters.query = this._objToQuery(parameters.query);
            if (url.indexOf('?') !== -1)
            { //Has ?
                url += '&' + parameters.query;
            }
            else //add ?
            {
                url += '?' + parameters.query;
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
                if (xhr.readyState === 4) //HTTP results!
                {
                    if (parameters.datatype === 'json') //json
                    {
                        callback(xhr.status, that._headersToHeaders(xhr.getAllResponseHeaders()), that.parseJSON(xhr.responseText));
                    }
                    else if (parameters.datatype === 'json') //xml
                    {
                    	callback(xhr.status, that._headersToHeaders(xhr.getAllResponseHeaders()), xhr.responseText);
                    }
                    else //other
                    {
                        callback(xhr.status, that._headersToHeaders(xhr.getAllResponseHeaders()), xhr.responseText);
                    }
                }
            };

            xhr.open(parameters.method, url, true);
            if (typeof exports === 'object' && exports)
            {
                xhr.disableHeaderCheck(true); //Disable header check
                if (typeof parameters.useragent !== 'undefined')
                {
                    xhr.setRequestHeader('User-Agent', parameters.useragent);
                }

                if (typeof parameters.headers === 'object')
                {
                    for (var key in parameters.headers)
                    {
                        if (parameters.headers.hasOwnProperty(key))
                        {
                            xhr.setRequestHeader(key, parameters.headers[key]);
                        }
                    }
                }
            }

            if (parameters.method === 'POST')
            {
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }

            if (parameters.method === 'POST' || parameters.method === 'PUT')
            {
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }

            if (parameters.method === 'POST' || parameters.method === 'PUT')
            {
                if (typeof parameters.data !== 'undefined')
                {
                    xhr.send(parameters.data);
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
    //jQuery - some code ripped from jQuery, and modified to work standalone
    rvalidchars: /^[\],:{}\s]*$/,
    rvalidescape: /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
    rvalidtokens: /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
    rvalidbraces: /(?:^|:|,)(?:\s*\[)+/g,
    parseJSON: function (data)
    {
        try
        {
            if (typeof exports === 'object' && exports) //This is a module, use native JSON parser
            {
                return JSON.parse(data);
            }
            else //web browser
            {
                if (typeof data !== "string" || !data)
                {
                    return null;
                }

                // Make sure leading/trailing whitespace is removed (IE can't handle it)
                data = this.trim(data);

                // Attempt to parse using the native JSON parser first
                if (window.JSON && window.JSON.parse)
                {
                    return window.JSON.parse(data);
                }

                // Make sure the incoming data is actual JSON
                // Logic borrowed from http://json.org/json2.js
                if (rvalidchars.test(data.replace(rvalidescape, "@").replace(rvalidtokens, "]").replace(rvalidbraces, "")))
                {
                    return (new Function("return " + data))();
                }
            }
        }
        catch (e)
        {
            return null;
        }
    },
    trim: function (str, charlist)
    {
        // http://kevin.vanzonneveld.net
        // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // +   improved by: mdsjack (http://www.mdsjack.bo.it)
        // +   improved by: Alexander Ermolaev (http://snippets.dzone.com/user/AlexanderErmolaev)
        // +      input by: Erkekjetter
        // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // +      input by: DxGx
        // +   improved by: Steven Levithan (http://blog.stevenlevithan.com)
        // +    tweaked by: Jack
        // +   bugfixed by: Onno Marsman
        // *     example 1: trim('    Kevin van Zonneveld    ');
        // *     returns 1: 'Kevin van Zonneveld'
        // *     example 2: trim('Hello World', 'Hdle');
        // *     returns 2: 'o Wor'
        // *     example 3: trim(16, 1);
        // *     returns 3: 6
        var whitespace, l = 0,
            i = 0;
        str += '';

        if (!charlist)
        {
            // default list
            whitespace = " \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";
        }
        else
        {
            // preg_quote custom list
            charlist += '';
            whitespace = charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '$1');
        }

        l = str.length;
        for (i = 0; i < l; i++)
        {
            if (whitespace.indexOf(str.charAt(i)) === -1)
            {
                str = str.substring(i);
                break;
            }
        }

        l = str.length;
        for (i = l - 1; i >= 0; i--)
        {
            if (whitespace.indexOf(str.charAt(i)) === -1)
            {
                str = str.substring(0, i + 1);
                break;
            }
        }

        return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
    },
    //Private
    _objToQuery: function (obj)
    {
        if (typeof obj === 'object')
        {
            var str = [];
            for (var key in obj)
            {
                if (obj.hasOwnProperty(key))
                {
                    str.push(this.encode(key) + '=' + this.encode(obj[key]));
                }
            }
            return str.join('&');
        }
        else
        {
            return obj;
        }
    },
    _headersToHeaders: function (headers_str)
    {
        if (headers_str.indexOf('\n') !== -1)
        {
            var headers_list = headers_str.split('\n');

            var header_obj = {};
            for (var key in headers_list)
            {
                if (headers_list.hasOwnProperty(key))
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
            if (letters[key] === c)
            {
                return key;
            }
        }
        return null;
    },
    _getXHR: function ()
    {
        if (typeof exports === 'object' && exports) //This is a module, require XHR support.
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
                if (obj.hasOwnProperty(attrname))
                {
                    newobj[attrname.toLowerCase()] = obj[attrname];
                }
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
        if (typeof obj1 !== 'object')
        {
            obj1 = {};
        }

        if (typeof obj2 !== 'object')
        {
            obj2 = {};
        }
        //Merge
        var obj3 = {};
        for (var attrname in obj1)
        {
            if (obj1.hasOwnProperty(attrname))
            {
                obj3[attrname] = obj1[attrname];
            }
        }

        for (var attrname2 in obj2)
        {
            if (obj2.hasOwnProperty(attrname2))
            {
                obj3[attrname2] = obj2[attrname2];
            }
        }
        return obj3;
    }
};

// Make a Node module, if possible.
if (typeof exports === 'object' && exports)
{
    module.exports = HTTPRequest;
}