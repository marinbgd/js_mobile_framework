(function () {
	'use strict';

	VL.namespace('VL.components.canvasDemo');

	VL.components.canvasDemo = (function () {

		var init = function () {

				var componentData = {
					state: 'canvasDemo',
					viewUrl: 'components/canvasDemo/canvasDemo.html',
					beforeDrawFn: beforeDrawFn,
					afterDrawFn: afterDrawFn,
					destroyFn: destroyFn
				};

				VL.components.registerComponent(componentData);
			},

			beforeDrawFn = function () {
				console.log('canvasDemo beforeDrawFn');
			},

			afterDrawFn = function () {
				console.log('canvasDemo afterDrawFn');

				VL.components.canvasDemo.helper.init();
				$(window).on('resize', VL.components.canvasDemo.helper.setCanvasSizeCss);

				VL.components.canvasDemo.helper.drawNicelyBgLogo();

				$('#canvasDemo').on('click', VL.components.canvasDemo.helper.stopAnimation);
			},

			destroyFn = function () {
				console.log('canvasDemo destroyFn');

				$(window).off('resize', VL.components.canvasDemo.helper.setCanvasSizeCss);
				$('#canvasDemo').off('click', VL.components.canvasDemo.helper.stopAnimation);
			};


		return {
			init: init
		};

	}());

}());