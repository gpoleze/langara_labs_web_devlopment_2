<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Echo all input</title>
    <style type="text/css">
        p {
            padding-left: 2em;
        }

    </style>
</head>

<body>
    <h1>All values echoed</h1>

    <p>You came from: <br/> your browser has a host IP address of: 108.180.82.191<br/> and your User Agent is: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36.</p>

    <h2>Values via <em>post</em></h2>

    <?php
    $xval = $_POST["xval"];
    $yval = $_POST["yval"];
    $phone = $_POST["phone"];
    $postalCode = $_POST["postalCode"];
    $music = $_POST["music"];
    $winter = $_POST["winter"];
    $country = $_POST["country"];
    ?>

        <p>
            <?php

                echo "xval ==> $xval <br/>";
                echo "yval ==> $yval <br/>";
                echo "phone ==> $phone <br/>";
                echo "postalCode ==> $postalCode <br/>";
                echo "music ==> $music <br/>";
                echo "winter[] ==> ".implode(", ",$winter)." <br/>";
                echo "country ==> $country <br/>";

            ?>

        </p>
        <p>You use POST when the values you are sending to the server 'permanently' stay on or modify the server. It's also a little harder to spoof.</p>

        <h2>Values via <em>get</em></h2>
        <p>No values sent via GET.<br/></p>
        <p>You use GET when you are obtaining 'readonly' values from the server.</p>
</body>

</html>
