<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="author" content="Gabriel Poleze Ferreira">
    <meta name="description" content="CPSC2030 Lab11">

    <title>Lab 11</title>

    <style>
        body {
            background-color: lightblue;
        }
        
        div {
            background-color: white;
            width: 45vw;
            height: 50vw;
            margin: 10px auto;
            overflow: auto;
            padding: 5px;
        }
        
        textarea {
            overflow: auto;
            padding: 0;
            margin: 0 auto;
            border: 2px solid lightgray;
            width: 80%;
            height: 75%;
        }
        
        textAreaDiv {
            margin: auto;
        }
                
        li {
            list-style: none;
        }
    </style>
</head>

<body>
    <h1>Lab 11</h1>
    <h2>Draw triangles</h2>

    <form method="post" action="#">
        <fieldset>

            <label>
                Size:
                <input type="text" id="size" name="size">
            </label>

            <br>
            <label>
                First Row Symbol:
                <select id="firstSymbol" name="firstSymbol">
                    <option value="@">@</option>
                    <option value="#">#</option>
                    <option value="$">$</option>
                    <option value="%">%</option>
                    <option value="*">*</option>
                </select>
            </label>

            <label>
                First Row Symbol:
                <input type="text" id="secondSymbol" size="1" maxlength="1" value="@" name="secondSymbol">
            </label>

            <br>
            <label>
                Draw Upside Down:
                <input type="checkbox" id="drawOrder" value="true" name="drawOrder">
            </label>

            <fieldset>
                <label>
                    <input type="radio" name="output" id="output" value="pre" checked>&#60pre&#62      <br>
                    <input type="radio" name="output" id="output" value="textarea">&#60textarea&#62 <br>
                    <input type="radio" name="output" id="output" value="ul">&#60ul&#62       <br>
                </label>
            </fieldset>

            <input type="submit" id="draw" value="Draw!">
        </fieldset>
    </form>

    <?php
    if (!isset($_POST['size'])|| $_POST['size'] == "") {
    
            echo "<p> Nothing tiped on size yet. </p>";

    } else {
        // GET THE INPUTS
            $size = $_POST['size'];
            $symbolOdd  = $_POST['firstSymbol'];
            $symbolEven = $_POST['secondSymbol'];
            $upsideDown = $_POST['drawOrder'];
            $output = $_POST['output'];

        //POPULATE THE STRINGS
            if ($output == "ul"){
                    $prefix = "<li>";
                    $sufix = "</li>";

                } else {
                    $prefix = "";
                    $sufix = "\n";
            }

            $triangle = makeTriangle($size, $upsideDown, $symbolOdd, $symbolEven, $prefix, $sufix);
                     
        //OUTPUT THE RESULTS
           output($triangle,$output);          

    }
    ?>

    <?php
        function output($output, $tag)
        {         

           echo "<br>
                    <div>
                        <$tag>";
                        echo $output;
                        echo "</$tag>
                    </div>";
        }
    ?>


            <?php
    
            function makeTriangle($size, $upsideDown, $symbolOdd, $symbolEven, $prefix, $sufix)
            {
                if ($upsideDown) {
                    return forDown($size, $symbolOdd, $symbolEven, $prefix, $sufix);
                }
                
                return forUp($size, $symbolOdd, $symbolEven, $prefix, $sufix);

            }

            function forUp($size, $symbolOdd, $symbolEven, $prefix, $sufix)
            {
                for ($i = 1; $i <= $size; $i++) {
                    $allLines = $allLines.createLine($i, (($i % 2 == 1) ? $symbolOdd : $symbolEven), $prefix, $sufix);
                }
                return $allLines;
            }

        function forDown($size, $symbolOdd, $symbolEven, $prefix, $sufix) 
        {
            for ($i = $size; $i >= 1; $i--)
                $allLines = $allLines.createLine($i, (($i % 2 === 1) ? $symbolOdd : $symbolEven), $prefix, $sufix);
            return $allLines;
        }

            function createLine($length, $symbol, $prefix, $sufix)
            {
                $line = $prefix;
                for ($i = 1; $i <= $length; $i++) {
                    $line = $line.$symbol;
                }
                $line = $line.$sufix;
                return $line;
            }

    ?>

</body>

</html>