<?php
// get the parameter
$location = $_GET['location'];
// look up parameter in chart
$data = array(
	'w' => array('city' => 'Vancouver', 'lat' => 49.239986, 'long' => -122.958169, 'comment' => 'My work place'),
	'h' => array('city' => 'Burnaby', 'lat' => 49.285821, 'long' => -122.8773065, 'comment' => 'My house (maybe)')
	);
// return back other data
if ( array_key_exists( $location , $data) )
	print json_encode ( array($data[$location]) );
else if ($location == 'b')
	print json_encode ( array($data['w'], $data['h']) );
else
	print json_encode (array());
?>
