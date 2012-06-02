var http_client = require('../HTTPRequest.js');

http_client.get('http://localhost/get_test.php', function(status, headers, content)
{
	console.log(status, headers, content)
});