var HTTPRequest = require('../HTTPRequest.js');

HTTPRequest.get('http://localhost/get_test.php', function(status, headers, content)
{
	console.log(status, headers, content)
},{QUERY: {pie: 'pumpkin', eat: 'Yes'}});