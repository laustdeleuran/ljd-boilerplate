/*
Copyright (C) 2013 Vertic A/S (http://vertic.com )

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*jslint browser: true, white: true*/
/*global define: true, jQuery: true*/

(function (gradientText) {
	'use strict';

	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], gradientText);
	} else {
		// Browser globals.
		gradientText(jQuery);
	}

} (function ($) {
	'use strict';

	$.fn.gradientText = function (options) {

		var settings = $.extend({
			startColor: { r:200, g:200, b:200 },
			endColor: { r:0, g:0, b:0 },
			subselector: 'span'
		}, options);

		// Add spans around each text node.
		function spanify($element) {
			$element.contents().each(function(){
				if (this.nodeType === 3) {
					var $this = $(this);

					$this.replaceWith($this.text().replace(/(\w)/g, '<span>$&</span>'));
				}
			});
		}

		return this.each(function () {
			spanify($(this));

			var width = $(this).width(),
				spans = $(this).find(settings.subselector);

			spans.each(function () {
				var $span = $(this),
					left = $span.offset().left + ($span.width() / 2),
					r = Math.floor(settings.startColor.r + ((left * (settings.endColor.r - settings.startColor.r)) / width)),
					g = Math.floor(settings.startColor.g + ((left * (settings.endColor.g - settings.startColor.g)) / width)),
					b = Math.floor(settings.startColor.b + ((left * (settings.endColor.b - settings.startColor.b)) / width));

				$span.css('color', 'rgb(' + r + ', ' + g + ', ' + b + ')');
			});
		});
	};
}));
