(function () {
	'use strict';

	VL.namespace('VL.components.login');

	VL.components.login = (function () {

		var init = function () {

				var loginComponentData = {
					state: 'login',
					viewUrl: 'components/login/login.html',
					beforeDrawFn: beforeDrawFn,
					afterDrawFn: afterDrawFn,
					destroyFn: destroyFn
				};

				VL.components.registerComponent(loginComponentData);
			},

			beforeDrawFn = function () {
				console.log('beforeDrawFn');
			},

			afterDrawFn = function () {
				console.log('afterDrawFn');
			},

			destroyFn = function () {
				console.log('destroyFn');
			};


		return {
			init: init
		};

	}());

}());