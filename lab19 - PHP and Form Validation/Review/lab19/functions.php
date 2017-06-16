<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" 
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <title>Lab 19</title>
</head>

<body>

    <?php
        function f1(){
        print_r("printing the f1 function <br>");
    }
    f1();
    
    //Testing global variales
    $global;
    print_r("printing the global variable >$global< <br>");
    
    function f2(){
        print_r("printing the global variable inside f2>$global< <br>");
        $global = 2;//esta variável é local
        print_r("printing the global variable inside f2>$global< <br>");
    }
    f2();
    print_r("printing the global variable >$global< <br>");
    
    function f3(){
        return 2;
    }
    $global = f3();
    print_r("printing the global variable >$global< <br>");
    
    
    function f4($global){
        print_r("printing the global variable inside f4>$global< <br>");
        $global = 4;//esta variável é local
        print_r("printing the global variable inside f4>$global< <br>");
    }
    
    f4($global);
    print_r("printing the global variable>$global< <br>");
    ?>
    
    
    
    
    <?php
    //Objects
    $object = new stdClass();
    $object->global = $global;
    
    echo "1) the value of the filed global inside the object is >".$object->global."< <br>";
    
    
    //functions and objects
    function fobj1(){
        //test if it is global
        echo "2) FUNCTION fobj1: the value of the filed global inside the object is >".$object->global."< <br>";
    }
    fobj1();
    
    
    function fobj2($obj){
        //test if it is global
        echo "3) FUNCTION fobj2: the value of the filed global inside the object is >".$obj->global."< <br>";
    }
    fobj2($object);
    
    
    function fobj3($obj){
        $obj->global = 3;
        echo "4) FUNCTION fobj3: the value of the filed global inside the object is >".$obj->global."< <br>";
    }
    fobj3($object);
    echo "5) the value of the filed global inside the object is >".$object->global."< <br>";
    
    function fobj4($obj){
        //test if it is global
        echo "6) FUNCTION fobj4: the value of the filed global inside the object is >".$obj->global."< <br>";
    }
    fobj4($object);
    
    
    function fobj5($obj){
        $obj->global = 5;
        return $obj;
    }
    fobj5($object);
    
    echo "7) the value of the filed global inside the object is >".$object->global."< <br>";
    
    ?>

</body>

</html>
