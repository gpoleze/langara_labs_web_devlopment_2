<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" 
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <title>Lab 17: Delete</title>
    <?php require_once ('db_info.php'); ?>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

</head>

<body>
    
    <!--  Deleting Code  -->
    
    <?php 
    
    if (isset($_POST['Delete']) and isset($_POST['toDelete']))
    {
        $toDelete = $_POST['toDelete'];
        $itemsToDelete = implode(",",$toDelete);
        echo "lenght toDelete ".sizeof($toDelete)." |EOL<br>";
        // error checking on the Code and Subject would occur here, but we'll save it for next lab
//        echo $itemsToDelete;
    
        
       $link = mysqli_connect( $host, $user, $password, $dbname);
        if (!$link) {
          die('Could not connect: ' . mysqli_connect_error());
        }
        //echo 'Connected successfully<br/>';

        // build a query
        $table = "dvds";
        // notice where you are using quotation marks, back ticks and apostrophes!
        $query = "DELETE FROM `$table` WHERE `dvds_id` IN ($itemsToDelete);";
        // use the query
        $result = mysqli_query($link, $query);

        // mysqli_affected_rows() tells how many rows were affected for INSERT, DELETE, and UPDATE SQL commands;
        // for SELECT commands use mysqli_num_rows() instead.
        echo " the variable result is $result |EOL<br>";
        if (mysqli_affected_rows($link) == sizeof($toDelete))
          echo "<strong>".sizeof($toDelete)." items was(were) successfully deleted from the database. <br>";
        else
          echo "<strong>Nothing</strong> was deleted.  " . mysqli_error($link);

        mysqli_close( $link );
    
        // Free the resources associated with the result set
        // This is done automatically at the end of the script
        mysqli_free_result($result);

        mysqli_close( $link );
        
    }
        
    ?>
    
    
    <!--  Instructions  -->
    <h1>Lab 17: PHP + mySQL</h1>
    <h2> Deleting from DVDStore</h2>


    <p>Select the title to delete from the entire table or search for a specific one.</p>
    <form action="#" method="post" class="form-inline">

        <div class="form-group">
            <label for="filter">Word:</label>
            <input type="text" name="filter" class="form-control">
        </div>

        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
                <input type="submit" value="Search" name="Search" class="btn btn-primary">
            </div>
        </div>
        
        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
                <input type="submit" value="Delete" name="Delete" class="btn btn-primary">
            </div>
        </div>

   <br>

    <!--  Code to mount the table  -->
    <?php 
    if (isset($_POST['Search'])){
        $link2 = mysqli_connect( $host, $user, $password, $dbname);
        if (!$link2) {
            die('Could not connect: ' . mysqli_connect_error());
        }
        //echo 'Connected successfully<br/>';
    
        if (!isset($_POST['filter']) || $_POST['filter'] == "" ) {
            // build a query
            $query2 = "SELECT  `dvds_id` AS  'Code',  `title` AS  'Title',  `duration` AS  'Duration' FROM  `dvds`";
        }
            else {
                $filter = $_POST['filter'];
                $query2 = "SELECT  `dvds_id` AS  'Code',  `title` AS  'Title',  `duration` AS  'Duration' FROM  `dvds` WHERE `title` like '%$filter%'" ;
    //            $stmt = $query->prepare("SELECT  `dvds_id` AS  'Code',  `title` AS  'Title',  `duration` AS  'Duration' FROM  `dvds` WHERE `title` like '%?%'" );
    //            $stmt->bindParam(1, $filter);
    //            $stmt->execute();
            }

            // use the query
        $result2 = mysqli_query( $link2, $query2 );

        // Check result
        // This shows the actual query sent to MySQL, and the error. Useful for debugging.
        if (!$result2) {
            $message  = 'Invalid query: ' . mysqli_error($link2) . "\n";
            $message .= 'Whole query: ' . $query2;
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
                    <th>Selection</th>
                </tr>";
      if (mysqli_num_rows($result2) == 0)
        echo "<tr><td colspan='2'>No records found.</td></tr>";
      else {
          $id = 0;
        while ($row = mysqli_fetch_assoc($result2)) {
          echo "<tr><td>" . $row['Code'] . "</td>";
          echo "<td>" . $row['Title'] . "</td>";
          echo "<td>" . $row['Duration'] . "</td>";
          echo "<td> <input type=\"checkbox\" name=\"toDelete[]\" value=\"" . $row['Code'] . "\" class=\"checkbox\"></td></tr>\n";
            $id++;
        }
      }
        echo "</table>";
        
    // Free the resources associated with the result set
    // This is done automatically at the end of the script
    mysqli_free_result($result2);
    
    mysqli_close( $link2 );
                
    }else{
        echo "Press Search to show the entire Table or Search for a Specific Item.";
    }
                
    ?>
    </form>


</body>

</html>
