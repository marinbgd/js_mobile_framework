(function () {
	'use strict';

	VL.namespace('VL.components.about');

	VL.components.about = (function () {

		var init = function () {

				var componentData = {
					state: 'about',
					viewUrl: 'components/about/about.html',
					beforeDrawFn: beforeDrawFn,
					afterDrawFn: afterDrawFn,
					destroyFn: destroyFn
				};

				VL.components.registerComponent(componentData);
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