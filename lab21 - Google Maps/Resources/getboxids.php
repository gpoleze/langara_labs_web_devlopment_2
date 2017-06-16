<?php
header("Access-Control-Allow-Origin: *");
header('Content-type: application/json');

// connect to database

require_once ('db_info.php'); 
$link = mysqli_connect( $host, $user, $password, $dbname);
if (!$link) {
	die('Could not connect: ' . mysqli_connect_error());
}
//echo 'Connected successfully<br/>';
$query = "SELECT Box_ID, `Box Type` FROM Data ORDER BY Box_ID;";
$result = mysqli_query( $link, $query );

$allIDs = array();
while ($row = mysqli_fetch_assoc($result)) {
  $allIDs[] = array(
    'id' => $row['Box_ID'],   
	'type' => $row['Box Type']
  );
}
//print_r ($allIDs);
echo json_encode($allIDs);
?>