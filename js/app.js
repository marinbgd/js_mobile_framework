(function () {
	'use strict';

	VL.namespace('VL.app');

	VL.app = (function () {

		var initApp = function () {
			console.log('app init started');

			//init route module
			VL.route.init();

			//init page height
			VL.html.pageHeight.init();

			//init uiLoader
			VL.html.uiLoader.init();

			//init components - register all components
			VL.components.login.init();
			VL.components.home.init();
			VL.components.about.init();
			VL.components.canvasDemo.init();

			VL.route.go('home');
		};

		//start the app
		Zepto(function(){
			initApp();
		});

	}());

}());