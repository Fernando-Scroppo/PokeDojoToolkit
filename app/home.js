define([
	'require',
	'dojo/ready',
	'dojox/validate/web',
	'app/validate/custom',
						  //El modulo creado para las validaciones personalizadas
], function(require, ready,Dialog){
	
	var app = {};
	
	ready(function(){
		console.log('loaded!');    
	});
	
	/**
	 * Display alert dialog.
	 */
	app.alert = function(message){
		require(['dijit/Dialog'], function(Dialog){
			var dialog = new Dialog({ title: 'Hello!', content: message });
			dialog.show();
		});
	};
	
	return app;
});