var HTTPRequest = require('../HTTPRequest.js');

HTTPRequest.post('http://localhost/post_test.php', {
    hello: 'world'
}, function (status, headers, content)
{
    console.log(status, headers, content);
});