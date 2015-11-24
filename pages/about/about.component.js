(function () {
	'use strict';

	VL.namespace('VL.pages.about');

	VL.pages.about = (function () {

		var init = function () {

				var componentData = {
					name: 'about',
					viewUrl: 'pages/about/about.html',
					beforeDrawFn: beforeDrawFn,
					afterDrawFn: afterDrawFn,
					destroyFn: destroyFn
				};

				VL.pages.registerPage(componentData);
			},

			beforeDrawFn = function () {
				console.log('about beforeDrawFn');
			},

			afterDrawFn = function () {
				console.log('about afterDrawFn');
			},

			destroyFn = function () {
				console.log('about destroyFn');
			};


		return {
			init: init
		};

	}());

}());