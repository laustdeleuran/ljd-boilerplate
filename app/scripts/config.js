'use strict';
requirejs.config({
	baseUrl: '/scripts/',
	paths: {
		'main': 'main',
		// Framework
		'core': 'framework/core',
		// Libs
		'jquery': '../components/jquery/dist/jquery',
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
});