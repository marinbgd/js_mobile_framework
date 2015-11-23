(function () {
	'use strict';

	VL.namespace('VL.app');

	VL.app = (function () {

		var storedControllers = [],

			initApp = function () {
				console.log('app init started');

				//init page module
				VL.page.init();

				setPageEventListeners();

				//init page height
				VL.html.pageHeight.init();

				//init uiLoader
				VL.html.uiLoader.init();

				//load first page
				VL.page.change('home.html');
			},

			setPageEventListeners = function () {
				document.addEventListener(VL.page.PAGE_BEFORE_LOAD, onPageBeforeLoad, false);
				document.addEventListener(VL.page.PAGE_LOAD_SUCCESS, onPageLoadSuccess, false);
				document.addEventListener(VL.page.PAGE_DRAW_FINISHED, onPageDrawFinish, false);
				document.addEventListener(VL.page.PAGE_LOAD_FAIL, onPageLoadFail, false);
			},

			onPageBeforeLoad = function (event) {
				getControllerFromPageAndExec(event.detail.pageName, 'destroyPage');
			},

			onPageLoadSuccess = function (event) {
				getControllerFromPageAndExec(event.detail.pageName, 'beforeDraw');
			},

			onPageDrawFinish = function (event) {
				getControllerFromPageAndExec(event.detail.pageName, 'afterDraw');
			},

			onPageLoadFail = function () {
				console.log('onPageLoadFail');
				VL.html.uiLoader.hide();
			},

			getJSFile = function (pathToJS) {

				if (typeof pathToJS === "undefined" || !(pathToJS)) {
					return undefined;
				}

				//get dynamically controller
				var scriptUrl = VL.globals.getBaseUrl() + 'js/' + pathToJS;

				return Q($.ajax({
					url: scriptUrl,
					async: false,
					type: 'get',
					crossDomain: false,
					dataType: 'script',
					cache: false
				}));
			},

			getControllerFromPageAndExec = function (pageNameWithDirStructure, successExecFunctionName) {

				if (typeof pageNameWithDirStructure === "undefined" || !(pageNameWithDirStructure)) {
					return undefined;
				}

				if (typeof successExecFunctionName === "undefined" || !(successExecFunctionName)) {
					return undefined;
				}

				//prepare page controllers name
				var pageNameWithUnderscore = pageNameWithDirStructure.replace('/', '_');

				//get controller from cache and execute function if exists
				var storedController = storedControllers[pageNameWithUnderscore];
				if (storedController) {
					if (storedController[successExecFunctionName] && typeof storedController[successExecFunctionName] === 'function') {
						storedController[successExecFunctionName]();
						return;
					}
				}

				//controller does not exist in cache, get it via ajax
				var scriptUrl = VL.globals.getBaseUrl() + 'js/controllers/' + pageNameWithDirStructure + '.js';

				VL.html.uiLoader.show();

				Q($.ajax({
					url: scriptUrl,
					type: 'get',
					async: false,
					crossDomain: false,
					dataType: 'script',
					cache: false
				}))
					.then( function () {

						var controller = VL.controllers[pageNameWithUnderscore];
						storedControllers[pageNameWithUnderscore] = controller;

						//exec success callback function
						if (controller[successExecFunctionName] && typeof controller[successExecFunctionName] === 'function') {
							controller[successExecFunctionName]();
						}
					}, function (error) {
						console.log('controller load fail');
					})
					.finally( function () {
						VL.html.uiLoader.hide();
					});
			};

		//start the app
		Zepto(function($){
			initApp();
		});

		return {
			getJSFile: getJSFile
		};

	}());

}());