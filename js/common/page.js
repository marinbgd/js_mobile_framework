(function () {
	'use strict';

	VL.namespace('VL.page');

	VL.page = (function () {

		var PAGE_BEFORE_LOAD = 'VL.page.before.load.event',
			PAGE_LOAD_SUCCESS = 'VL.page.load.success.event',
			PAGE_LOAD_FAIL = 'VL.page.load.fail.event',
			PAGE_DRAW_FINISHED = 'VL.page.draw.finished.event',

			baseUrl,
			viewsUrl,
			viewsDir,
			currentRequestedPage,
			pageHtmlContainer,

			init = function () {
				pageHtmlContainer = document.getElementById('content');
				setListenerOnAnchors();
				VL.globals.setBaseUrl();
				baseUrl = VL.globals.getBaseUrl();
				viewsUrl = VL.globals.getViewsUrl();
				viewsDir = VL.globals.getViewsDir();
			},

			setListenerOnAnchors = function () {
				$(document).on('click', 'a', anchorClickEventHandler);
			},

			anchorClickEventHandler = function (event) {
				event.preventDefault();
				event.stopPropagation();

				var href = event.currentTarget.getAttribute('href');

				if (href.length > 0 && href !== '#') {
					change(href);
				}
			},

			change = function (pageUrl) {

				//this event should trigger current page controller destroy method
				var event = new CustomEvent(PAGE_BEFORE_LOAD, {
					detail: {
						pageName: currentRequestedPage
					}
				});
				document.dispatchEvent(event);

				var absoluteUrl = viewsUrl + pageUrl;
				currentRequestedPage = pageUrl.replace('.html', '');

				$.ajax({
					type: 'GET',
					url: absoluteUrl,
					success: function (response) {
						changePageSuccessHandler(response);
					},
					error: function () {
						var event = new CustomEvent(PAGE_LOAD_FAIL);
						document.dispatchEvent(event);
					}
				});
			},

			changePageSuccessHandler = function (response) {
				var event;
				try {
					event = new CustomEvent(PAGE_LOAD_SUCCESS, {
						detail: {
							pageName: currentRequestedPage
						}
					});
					document.dispatchEvent(event);

					pageHtmlContainer.innerHTML = response;

					event = new CustomEvent(PAGE_DRAW_FINISHED, {
						detail: {
							pageName: currentRequestedPage
						}
					});
					document.dispatchEvent(event);

					//change window location for history implementation
					window.location.hash = currentRequestedPage;
				} catch (error) {
					console.log(error);
				}
			};

		return {
			PAGE_BEFORE_LOAD: PAGE_BEFORE_LOAD,
			PAGE_LOAD_SUCCESS: PAGE_LOAD_SUCCESS,
			PAGE_LOAD_FAIL: PAGE_LOAD_FAIL,
			PAGE_DRAW_FINISHED: PAGE_DRAW_FINISHED,

			init: init,
			change: change
		};

	}());

}());