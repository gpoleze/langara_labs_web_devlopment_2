<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" 
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <title>Lab 19</title>
    <?php
        require_once('db_info.php');
    ?>

        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

        <script type="text/javascript" src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.15.0/jquery.validate.min.js"></script>
        <!--        <script type="text/javascript" src="validation.js"></script>-->



        <style>
            body {
                min-width: 350px;
            }
            
            .center {
                text-align: center;
            }

        </style>
</head>

<body>

    <?php
    class SQLConnection
    {
        //fields
        public $host;
        public $user;
        public $password;
        public $dbname;
        
        public $link;
        
        public $result;
        
        //constructor
        function __construct($host, $user, $password, $dbname)
        {
            $this->host = $host;
            $this->user = $user;
            $this->password = $password;
            $this->dbname = $dbname;
        }
        
        //methods
        private function openLink() 
        {
            $this->link = mysqli_connect($this->host, $this->user, $this->password, $this->dbname);
            
            
            if (!$this->link) 
            {
                $this->link = null;
                die('Could not connect: ' . mysqli_connect_error());
            } else {
//                echo 'Connected successfully<br/>';
            }    
        }
        private function closeLink() 
        {
            mysqli_close($this->link);
        }
        
        private function executeQuery($query)
        {
            $this->openLink();
            $this->result = mysqli_query($this->link, $query);
             
            return mysqli_affected_rows($this->link);
        }
            
        public function selectQuery($query)
        {
            $this->executeQuery($query);
            if(!$this->result)
            {
                $message  = 'Invalid query: ' . mysqli_error($this->link) . "\n";
                $message .= 'Whole query: ' . $query;
                die($message);
            }
            $this->closeLink();
        }
        
        public function insertQuery($query)
        {
            $rows = $this->executeQuery($query);
//            if(mysqli_affected_rows($link) == 1)
            if($rows == 1)
                echo "The movie <strong><em>".$_POST['name']."</strong></em> which has <strong><em>".$_POST['duration']."</strong></em> minutes of duration was added to the list";
            else
                echo "<strong>(".$_POST['name'].", ".$_POST['duration'].")</strong> not added. ".mysqli_error($this->link);
        }
        
        public function deleteQuery($query)
        {
            $size = sizeof($_POST['toDelete']);
            $rows = $this->executeQuery($query);
//            if(mysqli_affected_rows($link) == 1)
            if($rows == $size)
                echo "<strong>$size</strong> item(s) was(were) successfully deleted from the database. <br>";
            else
                echo "<strong>Nothing</strong> was deleted.  ".mysqli_error($this->link);
            
        }    
    }
        
    $connection = new SQLConnection($host, $user, $password, $dbname);

    // Search for DVD
    function search($connection)
    {
        $query = "SELECT * FROM `dvds`";
        $filter = $_POST['filter'];
        $validFilter = preg_match("/^(\w)*$/", $filter);
        if($validFilter)
            {
                $query = "SELECT * FROM `dvds` WHERE `title` LIKE '%".$filter."%'";
            
                $connection->selectQuery($query);
            }    
    }
    
    //  Add DVD
    function add($connection)
    {
        $name = $_POST['name'];
        $duration = $_POST['duration'];

        $validName = preg_match("/^([\w \'\(\)\:]+)$/i", $name);
        $validDuration = preg_match("/^(\d)+$/", $duration);

        //echo "name: $name is $validName<br>";
        //echo "duration: $duration is $validDuration <br>";
                    
        if($validName && $validDuration)
        {
            $insert = "INSERT INTO `dvds`(`title`, `duration`) VALUES ('$name','$duration')";
                       
            $connection->insertQuery($insert,$_POST);
                                    
            $connection->result = null;
        }
            
    }
    
    function delete($connection)
    {
        $delete = $_POST['toDelete'];
        $items = "$delete[0]";
        for ($i = 1; $i < sizeof($delete); $i++ )
        {
            
            $items .= ", ".$delete[$i];
        }
        
        $query = $query = "DELETE FROM `dvds` WHERE `dvds_id` IN ($items);";
        
        $connection->deleteQuery($query);
        
        $connection->result = null;
        
    }
    
    if ($_POST)
        //print_r($_POST);
        if(array_key_exists('Search',$_POST))
            search($connection);
        if(array_key_exists('Add',$_POST))
            add($connection);
        if(isset($_POST['Delete']))
            delete($connection);
?>

    <!--  Instructions  -->
    <h1>Lab 19: PHP Form Validation</h1>
    <h2>Messing with DVDStore</h2>

    
    <form action="#" method="post" class="form-inline">
        
        <!--  Search Form  -->
        <div class="container">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <p>Search DVD on Database</p>
                </div>

                <div class="panel-body">
                    <div class="form-group">
                        <label for="filter">Word:</label>
                        <input type="text" name="filter" id="filter" class="form-control">
                    </div>

                    <input type="submit" value="Search" name="Search" id="search" class="btn btn-primary">
                </div>
            </div>
        </div>

        <!--  Add Form  -->
        <div class="container">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <p>Add DVD to Database</p>
                </div>

                <div class="panel-body">
                    <div class="form-group">
                        <label for="name">Name:</label>
                        <input type="text" id="name" name="name" placeholder="DVD name" class="form-control">
                    </div>

                    <div class="form-group">
                        <label for="duration">Duration(min):</label>
                        <input type="text" id="duration" name="duration" class="form-control" placeholder="Duration">
                    </div>

                    <input type="submit" value="Add" name="Add" id="add" class="btn btn-primary">
                </div>
            </div>
        </div>

        <!--Show Results table-->
        <div class="container">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <p>DVDs avaiable</p>
                </div>
                <div class="panel-body">
                    <table class="table">
                        <?php
                        //echo "isset(connection->result) => >". isset($connection->result)."<";
                        if (isset($connection->result)){
                        ?>
                            <thead>
                                <tr>
                                    <th class="center">Code</th>
                                    <th>Name</th>
                                    <th class="center">Duration</th>
                                    <th class="center">
                                        <input type="submit" value="Delete" name="Delete" class="btn btn-primary">
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                            for ($i = 0; $i < mysqli_num_rows($connection->result); $i++){
                                $row = mysqli_fetch_assoc($connection->result);
                                echo "<tr>";
                                echo "<td>".$row['dvds_id']."</td>";
                                echo "<td>".$row['title']."</td>";
                                echo "<td class=\"center\">".$row['duration']."</td>";
                                ?>
                                    <td class="center">
                                        <input type="checkbox" name="toDelete[]" value="<?php echo $row['dvds_id']?>">
                                    </td>
                                    <?php
                                echo "</tr>";
                            }
                        }
                        ?>
                            </tbody>
                    </table>
                </div>
            </div>
        </div>
    </form>

</body>

</html>
