(function () {
	'use strict';

	VL.namespace('VL.pages.home');

	VL.pages.home = (function () {

		var init = function () {

				var componentData = {
					name: 'home',
					viewUrl: 'pages/home/home.html',
					beforeDrawFn: beforeDrawFn,
					afterDrawFn: afterDrawFn,
					destroyFn: destroyFn
				};

				VL.pages.registerPage(componentData);
			},

			beforeDrawFn = function () {
				console.log('home beforeDrawFn');
			},

			afterDrawFn = function () {
				console.log('home afterDrawFn');
			},

			destroyFn = function () {
				console.log('home destroyFn');
			};


		return {
			init: init
		};

	}());

}());