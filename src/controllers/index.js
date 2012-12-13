(function($) {
	var Page = new App.module("index");
	var Router = Backbone.Router.extend({
		"routes": { 
			"": "index",
			"requested/*url": "requested" 
		},
		
		"requested": function(url) {
			var collection = new Page.Collections.Message();
			var view = new Page.Views.Index({
				"model": collection.get_one(),
				"url" : url
			});
		}
	});

	new Router();
	Backbone.history.start();
})(jQuery);
