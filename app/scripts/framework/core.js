/**
* Core
*
* Core container
*
* @section Framework
* @author ljd
*/
/*jslint plusplus: true, vars: true, browser: true, white:true*/
/*global require: true, Modernizr: true*/

define(['jquery', 'framework/log', 'framework/error'], function($, log, error){
	'use strict';
	var core, $body;

	core = {};

	// Logging
	core.log = log.log;
	log.polyfill();

	// Error handling
	core.Error = error.Class;
	core.errors = error.history;

	return core;
});