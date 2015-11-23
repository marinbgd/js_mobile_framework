(function () {
	'use strict';

	VL.namespace('VL.route');

	VL.route = (function () {

		var pageHtmlContainer,
			currentComponent = null,

			init = function () {
				pageHtmlContainer = document.getElementById('content');
				setListenerOnAnchors();
			},

			setListenerOnAnchors = function () {
				$(document).on('click', 'a', anchorClickEventHandler);
			},

			anchorClickEventHandler = function (event) {
				event.preventDefault();
				event.stopPropagation();

				var href = event.currentTarget.getAttribute('href');

				if (href.length > 0 && href !== '#') {
					go(href);
				}
			},

			go = function (stateName) {

				//call destroy function of previous component, if any
				if (currentComponent) {
					currentComponent.destroyFn();
				}

				currentComponent = VL.components.getComponentByStateName(stateName);

				console.log(currentComponent);

				if (!currentComponent) {
					console.log('Not valid route; No component associated.');
					return;
				}

				//get html
				_getHtml(currentComponent.viewUrl)
					.then( function (html) {
						_startRoute(html);
					});

			},

				_getHtml = function (url) {
					var request = new XMLHttpRequest();
					var deferred = Q.defer();

					request.open('GET', url, true);
					request.onload = onload;
					request.onerror = onerror;
					request.onprogress = onprogress;
					request.send();

					function onload() {
						if (request.status >= 200 && request.status < 300) {
							deferred.resolve(request.responseText);
						} else {
							deferred.reject(new Error("Status code was " + request.status));
						}
					}

					function onerror() {
						deferred.reject(new Error("Can't XHR " + JSON.stringify(url)));
					}

					function onprogress(event) {
						deferred.notify(event.loaded / event.total);
					}

					return deferred.promise;
				},

				_startRoute = function (html) {
					currentComponent.beforeDrawFn();
					pageHtmlContainer.innerHTML = html;

					currentComponent.afterDrawFn();
					VL.html.uiLoader.hide();

					//change window location for history implementation
					window.location.hash = currentComponent.state;
				};

		return {
			init: init,
			go: go
		};

	}());

}());