      
        $(document).ready(function(){
            var width = parseInt($("#width").val(), 10);
            var height = +$("#height").val();
            var symbol = $("#character option:selected").val();
            console.log(">",width,"<");
                console.log(height);
                console.log(symbol);
            
            
            
            $("#draw").click(draw);
            
            var output = "";
            function draw(){
                for (var i=0; i<width;i++)
                    for (var j=0; j<height;j++)
                        output += symbol;
                output += "\n"
            }
            
            $("output").html(output);
            
        });