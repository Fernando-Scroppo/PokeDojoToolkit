define("app/validate/custom", ["dojo", "dojo/_base/lang"], function(dojo, lang){
	var validate = lang.getObject("dojox.validate", true);
	
	validate.isOver666 = function(value, flags){
		console.log('validate');
		return (parseInt(value) > 666);
	};

	validate.telefonoFijo = function(value, flags){
		
		var test = validate.isNumberFormat(value, { format: "(###) ####-####" });
		return (test);
	};

	validate.celular = function(value, flags){
		
		var test = validate.isNumberFormat(value, { format: "##-########" });
		return (test);
	};

	
	
	return validate;
});