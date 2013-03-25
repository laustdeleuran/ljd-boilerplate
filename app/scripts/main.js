/*
 * Vertic JS - Site functional wrapper
 * http://labs.vertic.com
 *
 * Copyright 2012, Vertic A/S
 *
 */

/*jslint plusplus: true, vars: true, browser: true, white:true*/
/*global require: true*/

require.config({
	paths: {
		'jquery': 'libs/jquery-1.9.1',
		'modernizr': 'libs/modernizr-2.6.2'
	},
	shim: {
		'modernizr': []
	}
});

require(['jquery'], function($) {
	'use strict';

	// Establish dependencies the new way
	var Modernizr = require(['modernizr']),
		core = require(['framework/core']);

	$(function () {
		window.vertic = core;


	});
});
