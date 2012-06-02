if (typeof exports == 'object' && exports) //This is a module, XHR support.
{
    var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest; //Using xmlhttprequest 1.4.0 https://github.com/driverdan/node-XMLHttpRequest
}

var HTTPRequest = {
    //Public
    version: '0.0.1',
    defaultUA: 'HTTPRequest JS/' + this.version,
    post: function (url, data, callback, options)
    {
        var parameters = {
            METHOD: 'POST'
        };

        var request_parms = this._mergeobjs(options, parameters);

        callback('later');
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
    	
    	//Start request here...
    	    	
        callback('callback from req');
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