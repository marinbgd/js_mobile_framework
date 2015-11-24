(function () {
	'use strict';

	VL.namespace('VL.pages.login');

	VL.pages.login = (function () {

		var init = function () {

				var loginComponentData = {
					name: 'login',
					viewUrl: 'pages/login/login.html',
					beforeDrawFn: beforeDrawFn,
					afterDrawFn: afterDrawFn,
					destroyFn: destroyFn
				};

				VL.pages.registerPage(loginComponentData);
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