/**
* Vertic core - Vertic framework
*
* Core container
*
* @section Framework
* @author ldeleuran
* @modifiedby echristensen
*/

/*jslint plusplus: true, vars: true, browser: true, white:true*/
/*global require: true, Modernizr: true*/

define(['jquery', 'framework/log', 'framework/error'], function($, log, error){
	var core = {};
	core.log = new log.Class();
	core.error = new error.Class();

	// Toggle grid on SHIFT keydown REMOVE!
	function setCookie(c_name,value,exdays) {
		var exdate=new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
		document.cookie=c_name + "=" + c_value;
	}
	
	function getCookie(c_name) {
		var i,x,y,ARRcookies=document.cookie.split(";");
		for (i=0;i<ARRcookies.length;i++) {
			x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
			y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
			x=x.replace(/^\s+|\s+$/g,"");
			if (x==c_name) {
				return unescape(y);
			}
		}
	}
	
	if (!getCookie('showgrid')) {
		$('body').removeClass('grid-overlay');
	} else {
		$('body').addClass('grid-overlay');
	}
	
	$('body').keydown(function(e){
		if(e.which == 16){
			if (getCookie('showgrid')) {
				setCookie('showgrid',true,-1);
				$(this).removeClass('grid-overlay');
			} else {
				setCookie('showgrid',true,999);
				$(this).addClass('grid-overlay');
			}
		}
	});

	return core;
});