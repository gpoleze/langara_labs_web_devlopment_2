      $(document).ready(function () {




          $("#draw").click(draw);


          function draw() {
              var width = document.getElementById("width").value;
              var height = $("#height").val();
              var symbol = $("#character option:selected").val();

              console.log(">", width, "<");
              console.log(height);
              console.log(symbol);





              var output = "";

              for (var i = 0; i < width; i++)
                  for (var j = 0; j < height; j++)
                      output += symbol;
              output += "\n"
          }

          $("output").html(output);

      });
