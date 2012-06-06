var HTTPRequest = require('../HTTPRequest.js');

HTTPRequest.get('http://localhost/headers_test.php', function(status, headers, content)
{
	console.log(status, headers, content)
},{headers: {pie: 'pumpkin', eating: 'Yes'}});