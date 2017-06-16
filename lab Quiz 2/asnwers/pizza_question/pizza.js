$(document).ready(function(){

$("input").focusin(function () {
        if (this.id != "submit")
            $(this).addClass("orange");
    });

    $("input").focusout(function () {
        $(this).removeClass("orange");
    });

$("#order").click(function () { 
        if ($("#formToValidate").valid()) { 
            order();
        }
    });
    
$("#formToValidate").validate({
        //      
        rules: {
            clientName: {
                required: true,
                namePattern: true
            },
            size: {required:true,
                  sizePattern:true}
                      }

        }
    //    messages: {
    //        clientName: "You must enter an X offset value",
    //        years: "You must enter an Y offset value"
           
   //     }
    );
    
    $.validator.addMethod("namePattern", function (value, element) {
        return this.optional(element) || /^([A-Za-z]{1,} ?[A-Za-z]{1,}?)$/i.test(value);
    }, "Please enter either your first name or first and last names");

    $.validator.addMethod("sizePattern", function (value, element) {
        return this.optional(element) || /^(10|15|20)$/.test(value);
    }, "Please enter a 10, 15, or 20 only");
    
    function order(){
        console.log("start the order function");
        var client = $("#clientName").val();
        var size = $("#size").val();
//        
        var sauce = $("input[name=sauce]:checked").val();
//        
        var topping = $("#toppings").val();
        
        var cheese;
        if ($("#cheese").is(":checked"))
            cheese = true;
        else
            cheese = false;
//        
        console.log("clientName",client,"<");
        console.log("size",size,"<");
        console.log("sauce",sauce,"<");
        console.log("toppings",toppings,"<");
        console.log("cheese",cheese,"<");
        
        var topPrice = 0;
        for (var i = 0; i< topping.length; i++){
            
        }
        
        var subtotal = size * 1.25 + (cheese? 2: 0);
        $("#output").html(
            client + 
            "has ordered " 
            + size +" pizza with " 
            + sauce + " and " + topping+ 
            " with " 
            + (cheese? " extra ": " normal  ") 
            + "cheese"
            \n
            "Subtotal: " + subtotal+ "\n"
                    
        );
        
        
        
        
        
        output();
        
        
    }
});