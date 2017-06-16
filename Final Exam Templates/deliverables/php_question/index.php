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
        
        $query = "SELECT * FROM `RawData`";
        $filter = $_POST['filter'];
//        print_r($filter);
        $validFilter = preg_match("/^(\w)*$/", $filter);
        if($validFilter)
            {
            
                $query = "SELECT * FROM `RawData` WHERE `Location` LIKE '".$filter."%'";
            
                $connection->selectQuery($query);
            }    
    }
    
    if ($_POST)
        //print_r($_POST);
        if(array_key_exists('Search',$_POST))
            search($connection);
  
?>

        <!--  Instructions  -->
        <h1>CPSC2030: NestBox Database</h1>

        <form action="#" method="post" class="form-inline">

            <!--  Search Form  -->
            <div class="container">
                <div class="panel panel-primary">
                    <div class="panel-heading">
                        <p>Area Selection</p>
                    </div>

                    <div class="panel-body">
                        <div class="form-group">
                            <label for="filter">Please select an area</label>
                            <select name="filter" id="filter" class="form-control">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </select>
                        </div>

                        <input type="submit" value="Search" name="Search" id="search" class="btn btn-primary">
                    </div>
                </div>
            </div>


            <!--Show Results table-->
            <div class="container">
                <div class="panel panel-primary">
                    <div class="panel-heading">
                        <p>Info Back</p>
                    </div>
                    <div class="panel-body">
                        <table class="table">
                            <?php
                        //echo "isset(connection->result) => >". isset($connection->result)."<";
                        if (isset($connection->result)){
                        ?>
                                <thead>
                                    <tr>
                                        <th class="center">Tag No.</th>
                                        <th class="center">Tag Color</th>
                                        <th class="center">Box Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php
                            print_r("number of rows: ".mysqli_num_rows($connection->result));
                            for ($i = 0; $i < mysqli_num_rows($connection->result); $i++){
                                $row = mysqli_fetch_assoc($connection->result);
                                print_r($row);
                                echo "<tr>";
                                echo "<td class=\"center\>".$row['Tag No.']."</td>";
                                echo "<td class=\"center\>".$row['Tag Color']."</td>";
                                echo "<td class=\"center\">".$row['Box Type']."</td>";
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
