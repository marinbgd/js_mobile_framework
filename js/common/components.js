(function () {
	'use strict';

	VL.namespace('VL.components');

	VL.components = (function () {

		var components = [],

			Component = function (data) {
				return {
					state: data.state,
					viewUrl: data.viewUrl,
					beforeDrawFn: data.beforeDrawFn,
					afterDrawFn: data.afterDrawFn,
					destroyFn: data.destroyFn
				};
			},

			registerComponent = function (data) {

				if ( checkIfComponentAlreadyExists(data.state) ) {
					throw new Error('Component state already exists!');
				}

				var tempComponent = new Component(data);
				components.push(tempComponent);
			},

			getComponentByStateName = function (stateName) {
				for (var i = 0, length = components.length; i < length; i += 1) {
					if (components[i].state === stateName) {
						return components[i];
					}
				}
				return null;
			},

			checkIfComponentAlreadyExists = function (componentState) {
				for (var i = 0, length = components.length; i < length; i += 1) {
					if (components[i].state === componentState) {
						return true;
					}
				}
				return false;
			};

		return {
			registerComponent: registerComponent,
			getComponentByStateName: getComponentByStateName
		};

	}());

}());