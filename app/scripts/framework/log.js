/**
* Console log - Vertic framework
*
* Console log wrapper - based on http://www.paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
*
* @section Framework
* @author ldeleuran
*/
/*jslint plusplus: true, vars: true, browser: true, white:true*/
/*global require: true, Modernizr: true*/

define([], function () {
	var log, polyfill;

	// Universal logger
	log = function () {
		log.history.push(arguments);
		if (window.console && window.console.log) {
			console.log.apply(window.console, arguments);
		}
	};
	log.history = log.history || []; // store logs to an array for reference

	// Polyfill console.log for safety
	polyfill = function () {
		if (!window.console || !window.console.log) {
			window.console = {};
			console.log = function () {
				return;
			};
		}
	};

	return {
		log: log,
		polyfill: polyfill
	};
});
