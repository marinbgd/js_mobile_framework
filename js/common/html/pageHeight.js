(function () {
	'use strict';

	VL.namespace('VL.html.pageHeight');

	VL.html.pageHeight = (function () {

		var headerElement,
			footerElement,
			headerHeight,
			footerHeight,

			init = function () {
				headerElement = $('header');
				footerElement = $('footer');
				setHeightToPageDiv();
				setEventListeners();
			},

			setEventListeners = function () {
				$(window).on("resize orientationchange", resizeEventHandler );
			},

			resizeEventHandler = function () {
				setHeightToPageDiv();
			},

			setHeightToPageDiv = function () {
				headerHeight = headerElement.height();
				footerHeight = footerElement.height();

				$('#content').css({
					'top': headerHeight,
					'bottom': footerHeight
				});
			};


		return {
			init: init,
			setHeightToPageDiv: setHeightToPageDiv
		};

	}());

}());