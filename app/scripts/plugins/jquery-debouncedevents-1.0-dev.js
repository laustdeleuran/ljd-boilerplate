/**
 * jQuery debounced events
 *
 * Adopted from jQuery smart resize plugin by Paul Irish
 */
/*jslint plusplus: true, vars: true, browser: true, white:true*/
/*global define: true*/

define(['jquery'], function(jQuery) {
	'use strict';
	// Debounced resize listener - http://paulirish.com/2009/throttled-smartresize-jquery-event-handler/
	(function(jQuery, events) {
		// debouncing function from John Hann
		// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
		var debounce = function(func, threshold, execAsap) {
				var timeout;

				return function debounced() {
					var obj = this,
						args = arguments;

					function delayed() {
						if (!execAsap) {
							func.apply(obj, args);
						}
						timeout = null;
					}

					if (timeout) {
						clearTimeout(timeout);
					} else if (execAsap) {
						func.apply(obj, args);
					}

					timeout = setTimeout(delayed, threshold || 100);
				};
			};
		// Bind events
		jQuery.each(events, function(index, item) {
			var ev = item,
				sev = 'smart' + ev;
			jQuery.fn[sev] = function(fn) {
				return fn ? this.bind(ev, debounce(fn)) : this.trigger(sev);
			};
		});
	})(jQuery, ['resize', 'scroll', 'transitionend', 'scrollstop', 'scrollstart', 'vmousedown', 'vmouseup']);
});