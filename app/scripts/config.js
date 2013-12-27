(function () {
	'use strict';

	var config = {
		baseUrl: '/scripts/',
		paths: {
			'main': 'main',
			// Framework
			'core': 'framework/core',
			// Libs
			'jquery': '../components/jquery/jquery',
			// Plugins
			'touchevents': 'plugins/jquery-mobile-1.1.1-touchevents',
			'debouncedevents': 'plugins/jquery-debouncedevents',
			'easing': 'plugins/jquery-easing-1.3-dev',
		},
		shim: {
			touchevents: ['jquery'],
			easing: ['jquery'],
			debouncedevents: ['jquery']
		},
		deps: ['main']
	};

	if (typeof module !== 'undefined') {
		module.exports = config;
	} else if  (typeof require.config !== 'undefined') {
		require.config(config);
	}

}());