var VL = VL || {};

(function () {
	'use strict';

	VL.namespace = function (ns_string) {
		var parts = ns_string.split('.'),
			parent = VL,
			i;
		// strip redundant leading global
		if (parts[0] === "VL") {
			parts = parts.slice(1);
		}

		for (i = 0; i < parts.length; i += 1) {
			// create a property if it doesn't exist
			if (typeof parent[parts[i]] === "undefined") {
				parent[parts[i]] = {};
			}
			parent = parent[parts[i]];
		}
		return parent;
	};

}());