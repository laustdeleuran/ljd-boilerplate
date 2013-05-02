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

require(['jquery'], function($) {
	'use strict';

	// Establish dependencies the new way
	var core = require(['framework/core']);


	// Document ready
	$(function () {
		// Expose core as vertic first for debugging reasons
		window.vertic = core;


		/*
				*** YOUR CODE HERE ***
		*/

	});
});
