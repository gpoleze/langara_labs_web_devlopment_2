<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" 
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Lab 18: PHP: Example #2</title>
    <?php require_once ('../18/db_info.php'); ?>
</head>

<body>
    <h1>Lab 18: PHP: Example #2</h1>
    <h2> Retrieving from AnyOld Bookstore</h2>
<?php    
    $link = mysqli_connect( $host, $user, $password, $dbname);
    if (!$link) {
        die('Could not connect: ' . mysqli_connect_error());
    }
    //echo 'Connected successfully<br/>';

    // build a query
    $query = "SELECT * FROM `Subject`;";
    // use the query
    $result = mysqli_query( $link, $query );
    
    // Check result
    // This shows the actual query sent to MySQL, and the error. Useful for debugging.
    if (!$result) {
        $message  = 'Invalid query: ' . mysqli_error($link) . "\n";
        $message .= 'Whole query: ' . $query;
        die($message);
    }

    // Use result
    // Attempting to print $result won't allow us access to the information in the resource
    // One of the mysqli result functions must be used instead
    // See also mysqli_result(), mysqli_fetch_array(), mysqli_fetch_row(), etc.
	// If you use fetch_array() then you'll use numeric indexes to extract the pieces from the array, i.e., $row[0], $row[1], etc.
	// If you use fetch_assoc() then you'll use key values to extract the pieces from the array, ie., $row['label'], $row['another'], etc.
    echo "<table border=\"1\"><tr><th>Code</th><th>Subject</th></tr>";
	if (mysqli_num_rows($result) == 0)
		echo "<tr><td colspan='2'>No records found.</td></tr>";
	else {
		while ($row = mysqli_fetch_assoc($result)) {
			echo "<tr><td>" . $row['Code'] . "</td>";
			echo "<td>" . $row['Subject Name'] . "</td></tr>\n";
		}
	}
    echo "</table>";
	
    // Free the resources associated with the result set
    // This is done automatically at the end of the script
    mysqli_free_result($result);
    
    mysqli_close( $link );
?>
</body>
</html>