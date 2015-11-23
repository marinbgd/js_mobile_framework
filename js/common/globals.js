(function () {
	'use strict';

	VL.namespace('VL.globals');

	VL.globals = (function () {

		var baseUrl,
			apiUrl = null,

			setBaseUrl = function () {

				if( !location.origin ) {
					location.origin = location.protocol + "//" + location.host;
				}
				baseUrl = location.origin + '/js_mobile_framework/';
			},

			getBaseUrl = function () {
				return baseUrl;
			},

			getApiUrl = function () {
				return apiUrl;
			};

		return {
			setBaseUrl: setBaseUrl,
			getBaseUrl: getBaseUrl,
			getApiUrl: getApiUrl
		};

	}());

}());