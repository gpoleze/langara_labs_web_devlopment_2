<!DOCTYPE html>

<html lang="en">
<head>
    <title>Lab 17: PHP: Example #2</title>
    <meta charset="utf-8">
</head>

<body>
    <h1>Lab 17: PHP: Example #2</h1>

    <form action="#" method="post">
    <p>Make a list of size: <input type="text" name="count" 
    
    <?php if ( isset($_POST['count']) ) { 
		echo "value='" . $_POST['count'] . "'";
	}?>

    /></p>
    <p><input type="submit" /></p>
    </form>

    
	<?php 
		if ( !isset($_POST['count']) ) { 
	?>
	
			<p> None yet! </p>

	<?php 
		} else {
			$count = $_POST['count'];
			if ( $count == "" or !is_numeric($count) or !ctype_digit($count) ) { 
	?>
	
				<p>Please enter a positive number.</p>

	<?php 
			} else if ($count <= 0 ) {  
	?>
	
				<p>Please enter a value greater than 1.</p>

	<?php
			} else {
				echo "<ul>";
					for ($i = 1; $i <= $count; $i++)
						echo "<li> List item: $i of $count</li>";
						echo "</ul>";
			}
		}
	?>
    
</body>
</html>