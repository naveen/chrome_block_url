jQuery(function($) {
	Index = new tootlik.module('index');
	new Index.Router();

	Backbone.history.start();
});
