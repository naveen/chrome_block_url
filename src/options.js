jQuery(function($) {
	Url = new tootlik.module('url');
	new Url.Router();

	Backbone.history.start();
});
