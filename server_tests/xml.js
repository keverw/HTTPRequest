var HTTPRequest = require('../HTTPRequest.js');

HTTPRequest.get('http://localhost/xml.php', function (status, headers, content)
{
    console.log(status, headers, content);
}, {
    DATATYPE: 'xml'
});