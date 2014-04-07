/*
 * Site functional wrapper
 * http://ljd.dk
 */
/*jslint plusplus: true, vars: true, browser: true, white:true*/
/*global require: true, Modernizr: true*/

require([
	'core', 
	'jquery'
], function(
	core, 
	$
) {
	'use strict';

	// Expose core 
	window.ljd = core;

	// Document ready
	$(function () {
		core.log(core);
	});
});
