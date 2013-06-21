/*
 * Vertic JS - Site functional wrapper
 * http://labs.vertic.com
 *
 * Copyright 2012, Vertic A/S
 *
 */

/*jslint plusplus: true, vars: true, browser: true, white:true*/
/*global require: true, Modernizr: true*/

require.config({
	paths: {
		'jquery': '../components/jquery/jquery',
	}
});

require(['framework/core', 'jquery'], function(core, $) {
	'use strict';

	// Expose core as vertic first for debugging reasons
	window.vertic = core;

	// Document ready
	$(function () {

		/*
				*** YOUR CODE HERE OR IN MODULES ***
		*/

	});
});
