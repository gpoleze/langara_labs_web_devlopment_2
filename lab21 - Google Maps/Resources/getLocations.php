<?php
header("Access-Control-Allow-Origin: *");
header('Content-type: application/json');
// connect to database

require_once ('db_info.php'); 
$link = mysqli_connect( $host, $user, $password, $dbname);
if (!$link) {
	die('Could not connect: ' . mysqli_connect_error());
}

// pull in the required list of boxes
if (isset($_GET['boxes']) )
	if ( is_string($_GET['boxes']) )
		$whichBoxes = str_replace(',',"','",$_GET['boxes']);// assume it is a comma separated string
	else
		$whichBoxes = join ("', '", $_GET['boxes'] );  // assume it is an array of box ids
else
	$whichBoxes = '';

//echo 'Connected successfully<br/>';
$query = "SELECT * FROM Data WHERE `Box_ID` IN ('$whichBoxes') ORDER BY `Box_ID`;";
$result = mysqli_query( $link, $query );

$allIDs = array();
while ($row = mysqli_fetch_assoc($result)) {
  $latitudeParts = explode(' ',$row['Latitude']);
  $longitudeParts = explode(' ',$row['Longitude']);
  $allIDs[] = array(
    'id' => $row['Box_ID'],
	'latitude' => $latitudeParts[0] + round($latitudeParts[1]/60,6),
	'longitude' => $longitudeParts[0] - round($longitudeParts[1]/60,6),
	'type' => $row['Box Type'],
	'location' => $row['Location'],
	'subarea' => $row['Subarea']
  );
}
//print_r ($allIDs);
echo json_encode($allIDs);
?>