var tootlik = {
	module: function() {
		var modules = {};

		return function(name) {
			if (modules[name]) {
				return modules[name];
			}

			return modules[name] = { Views: {} };
		};
	}()
};

jQuery(function($) {
	Url = new tootlik.module('url');
	new Url.Router();

	Backbone.history.start();
});
