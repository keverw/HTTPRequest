var HTTPRequest = require('../HTTPRequest.js');

HTTPRequest.get('http://localhost/json.php', function(status, headers, content)
{
	console.log(status, headers, content)
},{DATATYPE: 'json'});