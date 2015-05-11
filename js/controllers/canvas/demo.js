(function () {
	'use strict';

	VL.namespace('VL.controllers.canvas_demo');

	VL.controllers.canvas_demo = (function () {

		var jsLoaded;

		return {

			beforeDraw: function () {
				console.log('VL.controllers.canvasDemo beforeDraw');

				//get canvasDemo js
				var canvasDemoInitJsUrl = 'canvasDemo/init.js';
				jsLoaded = VL.app.getJSFile(canvasDemoInitJsUrl);

				if (!jsLoaded) {
					console.log('load error');
					return;
				}
			},

			afterDraw: function () {
				console.log('VL.controllers.canvasDemo afterDraw');

				if (!jsLoaded) {
					return;
				}

				VL.canvasDemo.init.init();
				$(window).on('resize', VL.canvasDemo.init.setCanvasSizeCss);

				VL.canvasDemo.init.drawNicelyBgLogo();

				$('#canvasDemo').on('click', VL.canvasDemo.init.stopAnimation);
			},

			destroyPage: function () {
				console.log('VL.controllers.canvasDemo destroyPage');

				$(window).off('resize', VL.canvasDemo.init.setCanvasSizeCss);
				$('#canvasDemo').off('click', VL.canvasDemo.init.stopAnimation);
			}

		};

	}());

}());