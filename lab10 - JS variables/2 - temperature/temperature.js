(function (parameter) {
    'use strict';

	var convertTemperature = function ()
	{
	   /* //version 1
	   var temp = document.getElementById( parameter.temperatureID ).value;
	   */
	   /* // version 2
	   var temp = document.querySelector("#" + parameter.temperatureID ).value;
	   */
	   
	   //version 3
	   var temp = langara.get( parameter.temperatureID );
	   
	   var newTemp = 9.0 * temp / 5.0 + 32.0;
	   var outputMessage = temp + " degrees Celsius is  <strong>" + newTemp + "</strong> degrees Farenheit.";
	   
	   /* // version 1
	   document.getElementById( parameter.outputID ).innerHTML = outputMessage;
	   */
	   /* // version 2
	   document.querySelector("#" + parameter.outputID ).innerHTML = outputMessage;
	   */
	   
	   // version 3
	   langara.set( parameter.outputID , outputMessage );
	};

	var registerHandlers = function ()
	{
		/* // version 0
		   <input type="button" onclick="convertTemperature();" ...
		*/
		/* // version 1
		var button = document.getElementById( parameter.convertID );
		button.onclick = convertTemperture;
		*/
		/* // version 2
		var button = document.getElementById( parameter.convertID );
		button.addEventListener('click', convertTemperature, false);
		*/
		
		// version 3
		langara.registerEventHandler(parameter.convertID, 'click', convertTemperature);
	};
	
	registerHandlers();
	
})( {temperatureID:"Temp",
	 outputID:     "answer", 
	 convertID:    "Convert" } );