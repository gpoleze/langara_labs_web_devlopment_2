<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" 
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Lab 18: PHP: Example #1</title>
    <?php require_once ('../18/db_info.php'); ?>
</head>

<body>
<?php if (isset ($_POST['Code']) && isset ($_POST['Subject']) )
    {
        $code = $_POST['Code'];
        $subject = $_POST['Subject'];

		// error checking on the Code and Subject would occur here, but we'll save it for next lab

		$link = mysqli_connect( $host, $user, $password, $dbname);
		if (!$link) {
			die('Could not connect: ' . mysqli_connect_error());
		}
		// echo 'Connected successfully<br/>';

		// build a query
		// notice where you are using quotation marks, back ticks and apostrophes!
		$query = "INSERT INTO `$dbname`.`Subject` (`Code`, `Subject Name`) VALUES ('$code', '$subject');";
		// use the query
		$result = mysqli_query($link, $query );
		
		// mysqli_affected_rows() tells how many rows were affected for INSERT, DELETE, and UPDATE SQL commands;
		// for SELECT commands use mysqli_num_rows() instead.
		if (mysqli_affected_rows($link) == 1)
			echo "<strong>\"$subject\"</strong> with code <em>\"$code\"</em> was successfully added to the database.";
		else
			echo "<strong>($code,$subject)</strong> not added.  " . mysqli_error($link);
	
		mysqli_close( $link );
    }
?>
    <h1>Lab 18: PHP: Example #1</h1>
    <h2> Adding to AnyOld Bookstore</h2>
    <form action="" method="post">
    <p>Code: <input type ="text" name="Code" /></p>
    <p>Subject: <input type="text" name="Subject" /></p>
    <p><input type="submit" value="Add it!" /></p>
    </form>
</body>
</html>