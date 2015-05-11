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
				var event = $.Event(PAGE_BEFORE_LOAD, {pageName: currentRequestedPage});
				$(document).trigger(event);

				var absoluteUrl = viewsUrl + pageUrl;
				currentRequestedPage = pageUrl.replace('.html', '');

				$.ajax({
					type: 'GET',
					url: absoluteUrl
				})
					.done(function (response) {
						changePageSuccessHandler(response);
					})
					.fail(function (xhr, type) {
						var event = $.Event(PAGE_LOAD_FAIL);
						$(document).trigger(event);
					});
			},

			changePageSuccessHandler = function (response) {
				var event;
				try {
					event = $.Event(PAGE_LOAD_SUCCESS, {pageName: currentRequestedPage});
					$(document).trigger(event);

					pageHtmlContainer.innerHTML = response;

					event = $.Event(PAGE_DRAW_FINISHED, {pageName: currentRequestedPage});
					$(document).trigger(event);

					//change window location for history implementation
					/*window.location.href = baseUrl + '#' + viewsDir + '/' + currentRequestedPage;*/
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