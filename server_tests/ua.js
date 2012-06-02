var HTTPRequest = require('../HTTPRequest.js');

HTTPRequest.get('http://localhost/ua_test.php', function(status, headers, content)
{
	console.log(status, headers, content)
}, {useragent: 'IE 9001'});