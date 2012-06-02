var HTTPRequest = {
	version: '0.0.1',
	defaultUA: 'HTTPRequest JS/' + this.version,
	post: function (url, data, callback, options)
	{
		callback('later');
	},
    get: function (url, callback, options) {
    	callback('later');
    },
    request: function (url, parameters, data, callback) {
    	callback('later');
    },
    encode: function (url){
    	return 'later!';
    },
    decode: function (url){
    	return 'later!';
    }
};

// Make a Node module, if possible.
if (typeof exports == 'object' && exports)
{
	module.exports = HTTPRequest;
}