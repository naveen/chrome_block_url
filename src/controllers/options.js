(function($) {
	var Page = new App.module("options");
	var Router = Backbone.Router.extend({
		"routes": { "": "index" },
		"index": function() {
			var collection = new Page.Collections.Url();
			var view = new Page.Views.UrlIndex({"model": collection});
		}
	});

	new Router();
	Backbone.history.start();
})(jQuery);
