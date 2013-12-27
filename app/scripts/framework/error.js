/**
* Error log
*
* Error log - dependant on normal log module
*
* @section Framework
* @author ljd
*/

/*jslint plusplus: true, vars: true, browser: true, white:true*/
/*global require: true, Modernizr: true*/

define(['jquery', 'framework/log'], function($, log) {
	'use strict';
	var defaults, history;

	defaults = {
		fileName: undefined,
		lineNumber: undefined,
		doPhoneHome: false,
		url: 'http://debug.ljd.dk/js',
		severity: 1,
		doThrow: false,
		debug: window.location.href.indexOf('jsdebug=true') > -1 ? true : false
	};
	history = [];

	function Err (msg, options) {
		var settings = $.extend({}, defaults, options);

		history.push(this);

		this.msg = msg;
		this.settings = settings;
		this.id = history.length;
		this.time = Date.now();

		this.user = {
			windowInnerWidth: window.innerWidth,
			windowInnerHeight: window.innerHeight,
			userAgent: navigator.userAgent
		};

		this.debug();

		this.phoneHome();

		if (settings.doThrow) {
			this.throwError();
		} else {
			log.log('Error: ' + msg, this);
		}

		return this;
	}
	Err.prototype.debug = function () {
		var settings = this.settings;

		if (settings.debug) {
			alert(
				'Error: ' + this.msg +
				(settings.fileName ? ' - File: ' + settings.fileName + ' - ' : '') +
				(settings.lineNumber ? ' - Line number: ' + settings.lineNumber + ' - ' : '')
			);
		}
	};
	Err.prototype.phoneHome = function () {
		var settings = this.settings;

		if (settings.doPhoneHome) {
			this.image = new Image();
			this.image.src = settings.url +
				'?msg=' + encodeURIComponent(msg) +
				(settings.fileName ? '&fn=' + encodeURIComponent(settings.fileName) : '') +
				(settings.lineNumber ? '&ln=' + encodeURIComponent(settings.lineNumber) : '') +
				'&w=' + encodeURIComponent(this.user.windowInnerWidth) +
				'&h=' + encodeURIComponent(this.user.windowInnerHeight) +
				'&ua=' + encodeURIComponent(this.user.userAgent) +
				'&sv=' + encodeURIComponent(settings.severity) +
				'&url=' + encodeURIComponent(window.location.href);
		}
	};
	Err.prototype.throwError = function () {
		throw new Error(this.msg, this.settings.fileName, this.settings.lineNumber);
	};

	return {
		Class: Err,
		history: history
	};
});
