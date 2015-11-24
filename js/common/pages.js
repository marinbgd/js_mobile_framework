(function () {
	'use strict';

	VL.namespace('VL.pages');

	VL.pages = (function () {

		var pages = [],

			Page = function (data) {
				return {
					name: data.name,
					viewUrl: data.viewUrl,
					beforeDrawFn: data.beforeDrawFn,
					afterDrawFn: data.afterDrawFn,
					destroyFn: data.destroyFn
				};
			},

			registerPage = function (data) {

				if ( checkIfComponentAlreadyExists(data.name) ) {
					throw new Error('Page name already exists!');
				}

				var tempPage = new Page(data);
				pages.push(tempPage);
			},

				getPageByStateName = function (stateName) {
				for (var i = 0, length = pages.length; i < length; i += 1) {
					if (pages[i].name === stateName) {
						return pages[i];
					}
				}
				return null;
			},

			checkIfComponentAlreadyExists = function (componentState) {
				for (var i = 0, length = pages.length; i < length; i += 1) {
					if (pages[i].name === componentState) {
						return true;
					}
				}
				return false;
			};

		return {
			registerPage: registerPage,
			getPageByStateName: getPageByStateName
		};

	}());

}());