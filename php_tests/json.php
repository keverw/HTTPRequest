<?php
header('Content-type: application/json');
$json_output = array();

$json_output['type'] = 'Apple';
$json_output['cost'] = '$9001';
$json_output['vendor'] = 'Mommy\'s Bake shop';

echo json_encode($json_output);
?>