(function () {
	'use strict';

	VL.namespace('VL.components.home');

	VL.components.home = (function () {

		var init = function () {

				var componentData = {
					state: 'home',
					viewUrl: 'components/home/home.html',
					beforeDrawFn: beforeDrawFn,
					afterDrawFn: afterDrawFn,
					destroyFn: destroyFn
				};

				VL.components.registerComponent(componentData);
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