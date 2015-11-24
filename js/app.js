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

			//init pages - register all pages
			VL.pages.login.init();
			VL.pages.home.init();
			VL.pages.about.init();
			VL.pages.canvasDemo.init();

			VL.route.go('home');
		};

		//start the app
		Zepto(function(){
			initApp();
		});

	}());

}());