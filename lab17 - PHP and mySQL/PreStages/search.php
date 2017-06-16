<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" 
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <title>Lab 17: Search</title>
    <?php require_once ('db_info.php'); ?>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

</head>

<body>
    <h1>Lab 17: PHP + mySQL</h1>
    <h2> Retrieving from DVDStore</h2>

    <form action="#" method="post" class="form-inline">
        <div class="form-group">
            <label for="filter">Insert a word you want to find or left blank to all the results.</label>
            <input type="text" name="filter" class="form-control">
        </div>

        <input type="submit" value="Search" class="btn btn-primary">
    </form>
    <br>


    <?php 
    $link = mysqli_connect( $host, $user, $password, $dbname);
    if (!$link) {
        die('Could not connect: ' . mysqli_connect_error());
    }
    //echo 'Connected successfully<br/>';

    if (!isset($_POST['filter']) || $_POST['filter'] == "") {
        // build a query
        $query = "SELECT  `dvds_id` AS  'Code',  `title` AS  'Title',  `duration` AS  'Duration' FROM  `dvds`";
    }
        else {
            $filter = $_POST['filter'];
            $query = "SELECT  `dvds_id` AS  'Code',  `title` AS  'Title',  `duration` AS  'Duration' FROM  `dvds` WHERE `title` like '%$filter%'" ;
//            $stmt = $query->prepare("SELECT  `dvds_id` AS  'Code',  `title` AS  'Title',  `duration` AS  'Duration' FROM  `dvds` WHERE `title` like '%?%'" );
//            $stmt->bindParam(1, $filter);
//            $stmt->execute();
        }
        
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
    //echo "<table border=\"1\">
    echo "<table class=\"table\">
            <tr>
                <th>Code</th>
                <th>Title</th>
                <th>Duration</th>
            </tr>";
  if (mysqli_num_rows($result) == 0)
    echo "<tr><td colspan='2'>No records found.</td></tr>";
  else {
    while ($row = mysqli_fetch_assoc($result)) {
      echo "<tr><td>" . $row['Code'] . "</td>";
      echo "<td>" . $row['Title'] . "</td>";
      echo "<td>" . $row['Duration'] . "</td></tr>\n";
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
