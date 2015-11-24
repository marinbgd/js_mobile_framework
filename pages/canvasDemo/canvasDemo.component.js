(function () {
	'use strict';

	VL.namespace('VL.pages.canvasDemo');

	VL.pages.canvasDemo = (function () {

		var init = function () {

				var componentData = {
					name: 'canvasDemo',
					viewUrl: 'pages/canvasDemo/canvasDemo.html',
					beforeDrawFn: beforeDrawFn,
					afterDrawFn: afterDrawFn,
					destroyFn: destroyFn
				};

				VL.pages.registerPage(componentData);
			},

			beforeDrawFn = function () {
				console.log('canvasDemo beforeDrawFn');
			},

			afterDrawFn = function () {
				console.log('canvasDemo afterDrawFn');

				VL.pages.canvasDemo.helper.init();
				$(window).on('resize', VL.pages.canvasDemo.helper.setCanvasSizeCss);

				VL.pages.canvasDemo.helper.drawNicelyBgLogo();

				$('#canvasDemo').on('click', VL.pages.canvasDemo.helper.stopAnimation);
			},

			destroyFn = function () {
				console.log('canvasDemo destroyFn');

				$(window).off('resize', VL.pages.canvasDemo.helper.setCanvasSizeCss);
				$('#canvasDemo').off('click', VL.pages.canvasDemo.helper.stopAnimation);
			};


		return {
			init: init
		};

	}());

}());