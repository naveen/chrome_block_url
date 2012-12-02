var callback = function (request) {
	var url_prefix = "^(http(s)?:\/\/)?(www\.)?";

	try {
		var collection = JSON.parse(localStorage['urls']);
		for(var i in collection) {
			var url_regex = new RegExp(url_prefix + collection[i].name, "i");

			if(request
			&& request.url
			&& url_regex.test(request.url)) {
				return redirect('#request/' + request.url);
			}
		}
	} catch(err) { }
};

var filter = {
	urls: ['<all_urls>'],
	types: ['main_frame']
};

var opt_extraInfoSpec = ['blocking'];

var redirect = function(arg) {
	var app_id = chrome.i18n.getMessage('@@extension_id');
	var page = 'chrome-extension://' + app_id + '/index.html';

	return {'redirectUrl': page + arg};
}

chrome.webRequest.onBeforeRequest.addListener(callback, filter, opt_extraInfoSpec);
