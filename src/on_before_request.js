var callback = function (request) {
	try {
		var collection = JSON.parse(localStorage['urls']);
		for(var i in collection) {
			var regex = new RegExp(collection[i].name, "i");

			if(request
			&& request.url
			&& regex.test(request.url)) {
				return {cancel: true};
				//return { redirectUrl: 'http://www.google.com' }
			}
		}
	} catch(err) { }
};

var filter = {
	urls: ['<all_urls>'],
	types: ['main_frame']
};

var opt_extraInfoSpec = ['blocking'];

chrome.webRequest.onBeforeRequest.addListener(
	callback, filter, opt_extraInfoSpec);
