(function () {
	'use strict';

	VL.namespace('VL.globals');

	VL.globals = (function () {

		var baseUrl,
			viewsUrl,
			viewsDir = 'views',
			apiUrl = null,

			setBaseUrl = function () {

				if( !location.origin ) {
					location.origin = location.protocol + "//" + location.host;
				}
				baseUrl = location.origin + '/js_mobile_framework/';

				setViewsUrl();
			},

			getBaseUrl = function () {
				return baseUrl;
			},

			setViewsUrl = function () {
				viewsUrl = baseUrl + viewsDir + '/';
			},

			getViewsUrl = function () {
				return baseUrl + viewsDir + '/';
			},

			getViewsDir = function () {
				return viewsDir;
			},

			getApiUrl = function () {
				return apiUrl;
			};

		return {
			setBaseUrl: setBaseUrl,
			getBaseUrl: getBaseUrl,
			getViewsUrl: getViewsUrl,
			getViewsDir: getViewsDir,
			getApiUrl: getApiUrl
		};

	}());

}());