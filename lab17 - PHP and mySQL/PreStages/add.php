<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" 
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <title>Lab 17: View table</title>
    <?php require_once ('db_info.php'); ?>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

</head>

<body>


<?php if (isset ($_POST['name']) && isset ($_POST['duration']) )
    {
        $name = $_POST['name'];
        $duration = $_POST['duration'];

    // error checking on the Code and Subject would occur here, but we'll save it for next lab

    $link = mysqli_connect( $host, $user, $password, $dbname);
    if (!$link) {
      die('Could not connect: ' . mysqli_connect_error());
    }
    // echo 'Connected successfully<br/>';

    // build a query
        $table = "dvds";
    // notice where you are using quotation marks, back ticks and apostrophes!
    $query = "INSERT INTO `$table`(`title`, `duration`) VALUES ('$name','$duration');";
    // use the query
    $result = mysqli_query($link, $query );
    
    // mysqli_affected_rows() tells how many rows were affected for INSERT, DELETE, and UPDATE SQL commands;
    // for SELECT commands use mysqli_num_rows() instead.
    if (mysqli_affected_rows($link) == 1)
      echo "<strong>The film \"$name\"</strong> which has <em>\"$duration\"min</em> was successfully added to the database.";
    else
      echo "<strong>($name,$duration)</strong> not added.  " . mysqli_error($link);
  
    mysqli_close( $link );
    }
?>



    <h1>Lab 17: View Table</h1>
    <h2> Adding from DVDStore</h2>

    <form action="#" method="post" class="form-horizontal">
        <p>Add DVD to Database</p>
        <div class="form-group">
            <label for="name" class="col-sm-2 control-label">Name:</label>
            <div class="col-sm-10">
                <input type="text" id="name" name="name" placeholder="DVD name" class="form-control">
            </div>
        </div>

        <div class="form-group">
            <label for="duration" class="col-sm-2 control-label">Duration(min):</label>
            <div class="col-sm-10">
                <input type="text" id="duration" name="duration" class="form-control" placeholder="Duration">
            </div>
        </div>

        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
                <input type="submit" value="Add" class="btn btn-primary">
            </div>
        </div>

    </form>
    <br>
</body>

</html>
