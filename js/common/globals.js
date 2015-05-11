(function () {
	'use strict';

	VL.namespace('VL.globals');

	VL.globals = (function () {

		var baseUrl,
			viewsUrl,
			viewsDir = 'views',
			apiUrl = 'http://91.185.100.46:8880/api/',

			setBaseUrl = function () {

				/* use this when deployed */
				/*try{
				 // if used with cordova / phonegap
				 baseUrl = cordova.file.applicationDirectory + 'www/';
				 } catch (error) {
				 if( !location.origin ) {
				 location.origin = location.protocol + "//" + location.host;
				 }
				 baseUrl = location.origin + '/';
				 }*/

				baseUrl = 'http://localhost/test/';
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