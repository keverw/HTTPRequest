<?php
header('Content-type: text/plain');
//from http://www.w3schools.com/xml/xml_dtd.asp
echo '<?xml version="1.0" encoding="ISO-8859-1"?>' . "\n";
?>
<!DOCTYPE note SYSTEM "Note.dtd">
<note>
<to>Tove</to>
<from>Jani</from>
<heading>Reminder</heading>
<body>Don't forget me this weekend!</body>
</note>